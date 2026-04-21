import { Github, Linkedin, Mail } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap"
});

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center pb-8 text-center sm:pb-12">
        <h1 className={`${playfairDisplay.className} italic text-heading`}>
          <span className="block text-6xl leading-none tracking-[-0.055em] sm:text-7xl md:text-8xl">
            Henry
          </span>
          <span className="block text-6xl leading-none tracking-[-0.055em] sm:text-7xl md:text-8xl">
            Bao
          </span>
        </h1>

        <p
          className={`${playfairDisplay.className} mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg`}
          style={{ fontStyle: "italic" }}
        >
          <span className="inline md:block">Computer science student at the University of Waterloo, </span>
          <span className="inline md:block">crafting clean, high-performance software.</span>
        </p>

        <div className="mt-5 flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/henryhbao/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="text-body transition-colors duration-300 hover:text-heading"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/TruVortex"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="text-body transition-colors duration-300 hover:text-heading"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:h39bao@uwaterloo.ca"
            aria-label="Email"
            className="text-body transition-colors duration-300 hover:text-heading"
          >
            <Mail size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}
