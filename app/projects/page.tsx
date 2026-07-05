import { ExternalLink } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { ProjectDetailsToggle } from "@/components/project-details-toggle";
import { getPinnedProjects } from "@/lib/github";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap"
});

export default async function ProjectsPage() {
  const projects = await getPinnedProjects("TruVortex");

  return (
    <main className="flex min-h-full flex-col">
      <section className="w-full py-8 sm:py-10">
        <div className="mx-auto w-full max-w-3xl">
          <p className="px-4 text-body sm:px-6">
            A selection of my favourite projects encompassing various areas of software. More
            projects can be found on my Github.
          </p>

          <div className="mt-8 border-y border-utility">
            {projects.map((project) => (
              <article
                key={project.id}
                className="border-b border-utility px-4 py-5 transition-colors duration-300 last:border-b-0 hover:bg-utility sm:px-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`${playfairDisplay.className} text-2xl italic text-heading transition-colors duration-300 hover:text-body`}
                  >
                    {project.name}
                  </a>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${project.name} GitHub repository`}
                    className="mt-1 text-body transition-colors duration-300 hover:text-heading"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                </div>

                <p className="mt-2 text-body">
                  {project.description ?? "No description provided on GitHub."}
                </p>

                {project.longDescription && project.longDescription.length > 0 ? <ProjectDetailsToggle longDescription={project.longDescription} /> : null}

                <p className="mt-3 text-sm text-body/80">
                  <span className="text-body">Language:</span> {project.techStack}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
