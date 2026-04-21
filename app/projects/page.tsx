import { ExternalLink } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { ProjectDetailsToggle } from "@/components/project-details-toggle";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap"
});

type Project = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  longDescription?: string;
  techStack: string;
};

const projects: Project[] = [
  {
    id: 1207399916,
    name: "hack-canada",
    html_url: "https://github.com/TruVortex/hack-canada",
    description: "App to calculate the propagating effects of tariffs on a corporation's expenses; built for HackCanada",
    techStack: "React, Tailwind, PostgreSQL, FastAPI, Backboard.io, TypeScript"
  },
  {
    id: 1198863883,
    name: "p2p-file-sync",
    html_url: "https://github.com/TruVortex/p2p-file-sync",
    description: "A high-performance, decentralized file synchronization engine to sync files from peer-to-peer on the same network",
    longDescription: "Built entirely in Go, the system leverages Content-Addressable Storage (CAS) and Merkle trees to quickly identify file differences and achieve O(logN) state reconciliation. To drastically reduce bandwidth usage, it implements an rsync-style rolling hash that transmits only the modified data chunks of a file rather than the entire payload. Furthermore, the engine guarantees secure, zero-trust communication across firewalls by pairing TLS-encrypted QUIC transport with robust NAT traversal techniques like UDP hole punching.",
    techStack: "Golang"
  },
  {
    id: 1190084793,
    name: "go-docker",
    html_url: "https://github.com/TruVortex/go-docker",
    description: "Lightweight project to emulate Docker's container functionality",
    longDescription: "This pure Go runtime utilizes Linux namespaces, chroot, and cgroups v2 to create isolated environments. It features a custom workflow for namespace spawning and memory resource control, specifically leveraging an Alpine Linux rootfs for filesystem isolation. Users can execute interactive shells or single commands with root privileges while maintaining container-specific PID 1 isolation and process replacement via syscalls. The project serves as a practical demonstration of the container lifecycle, including signal handling and automated cleanup.",
    techStack: "Golang, Linux"
  },
  {
    id: 433238901,
    name: "Templates",
    html_url: "https://github.com/TruVortex/Templates",
    description: "Compilation of templates for competitive in C++ and Python.",
    techStack: "C++, Python"
  },
  {
    id: 1176541241,
    name: "echosign",
    html_url: "https://github.com/TruVortex/echosign",
    description: "Radio transmissions that helps real people",
    longDescription: "this offline-capable emergency communication protocol is designed for disaster relief by using AI to compress messages into 24-byte semantic codes. The system transmits these codes via signed FSK audio tones and utilizes the Goertzel algorithm alongside Google Gemini to reconstruct human-readable alerts on the receiving end. Developed for the CXC 2026 AI Hackathon, the repo features a React-based mobile UI, a custom acoustic transport layer, and secure offline message signing.",
    techStack: "React, Tailwind, Gemini, Solana, TypeScript"
  },
  {
    id: 1160339600,
    name: "SIMD-Compute-Raster-Core",
    html_url: "https://github.com/TruVortex/SIMD-Compute-Raster-Core",
    description: "Graphics library built from scratch in C, utilizing Google highway for SIMD optimization",
    techStack: "C, Google Highway"
  },
  {
    id: 1134659916,
    name: "CSNO-Client",
    html_url: "https://github.com/TruVortex/CSNO-Client",
    description:
      "Recreation of CS:GO's community map \"Pool Day\" complete with (no) guns and multiplayer support through smart usage of ServerSocket. See the server-side joint project on my Github.",
    techStack: "Java, Java Swing"
  },
  {
    id: 1134612898,
    name: "FashionMNIST-Image-Classification",
    html_url: "https://github.com/TruVortex/FashionMNIST-Image-Classification",
    description:
      "This project uses PyTorch to train an image classifcation model on the FashionMNIST dataset, using Matplotlib to visualize the training and provide examples of the model in action.",
    techStack: "Python, PyTorch, NumPy"
  }
];

export default function ProjectsPage() {

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

                {project.longDescription ? <ProjectDetailsToggle longDescription={project.longDescription} /> : null}

                <p className="mt-3 text-sm text-body/80">
                  <span className="text-body">Tech Stack:</span> {project.techStack}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
