const GITHUB_API = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
}

interface ProjectData {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  longDescription: string | null;
  techStack: string;
}

async function getPinnedRepoNamesGraphQL(username: string): Promise<string[]> {
  try {
    const graphqlQuery = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6) {
            nodes {
              ... on Repository {
                name
              }
            }
          }
        }
      }
    `;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    }

    const graphqlResponse = await fetch(`${GITHUB_API}/graphql`, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: graphqlQuery }),
      next: { revalidate: 3600 }
    });

    if (!graphqlResponse.ok) {
      console.warn(`GraphQL request failed with status ${graphqlResponse.status}`);
      return [];
    }

    const graphqlData = await graphqlResponse.json();

    // Check for GraphQL errors
    if (graphqlData.errors) {
      console.warn("GraphQL errors:", graphqlData.errors);
      return [];
    }

    if (graphqlData.data?.user?.pinnedItems?.nodes) {
      return graphqlData.data.user.pinnedItems.nodes.map((repo: any) => repo.name);
    }

    return [];
  } catch (error) {
    console.warn("Error fetching pinned repos via GraphQL:", error);
    return [];
  }
}

export async function getPinnedProjects(username: string): Promise<ProjectData[]> {
  try {
    // Fetch user's repositories sorted by updated date
    const reposResponse = await fetch(`${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!reposResponse.ok) throw new Error(`Failed to fetch repos: ${reposResponse.status}`);

    const repos: GitHubRepo[] = await reposResponse.json();

    // Try to get pinned repo names via GraphQL
    const pinnedRepoNames = await getPinnedRepoNamesGraphQL(username);

    // If we got pinned repos, use those; otherwise fallback to recent repos
    const targetRepos = pinnedRepoNames.length > 0
      ? repos.filter(repo => pinnedRepoNames.includes(repo.name))
      : repos.slice(0, 6);

    // Fetch README for each repository to extract first paragraph
    const projectsWithDescriptions = await Promise.all(
      targetRepos.map(async (repo) => {
        let longDescription: string | null = null;

        try {
          const readmeResponse = await fetch(
            `${GITHUB_API}/repos/${username}/${repo.name}/readme`,
            {
              headers: { Accept: "application/vnd.github.v3.raw" },
              next: { revalidate: 3600 }
            }
          );

          if (readmeResponse.ok) {
            const readmeText = await readmeResponse.text();
            // Find the first main header (# or ##), then extract the paragraph after it
            const headerMatch = readmeText.match(/^#+\s+.+?\n/m);
            if (headerMatch) {
              // Start from after the first header
              const afterHeader = readmeText.substring(headerMatch.index! + headerMatch[0].length);
              // Extract paragraph until double newline, code block, or next header
              const paragraphMatch = afterHeader.match(/^[\s\S]*?(?=\n\n|```|\n#+\s|$)/);
              if (paragraphMatch) {
                longDescription = paragraphMatch[0]
                  .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Convert markdown links to plain text
                  .trim();

                // Only keep if it's substantial (not just repo name or very short)
                if (longDescription.length < 20) {
                  longDescription = null;
                }
              }
            }
          }
        } catch {
          // Silently continue if README fetch fails
        }

        return {
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          longDescription,
          techStack: repo.language || "Unknown"
        };
      })
    );

    return projectsWithDescriptions;
  } catch (error) {
    console.error("Error fetching pinned projects:", error);
    return [];
  }
}
