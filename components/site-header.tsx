import Link from "next/link";
import { Hexagon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-utility pb-4">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          aria-label="Home"
          className="text-body transition-colors duration-300 hover:text-heading"
        >
          <Hexagon className="h-6 w-6 shrink-0" />
        </Link>
        <nav className="flex items-center gap-5 text-sm text-body">
          <Link
            href="/projects"
            className="border-b border-transparent pb-0.5 transition-colors duration-300 hover:border-heading hover:text-heading"
          >
            Projects
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="border-b border-transparent pb-0.5 transition-colors duration-300 hover:border-heading hover:text-heading"
          >
            Resume
          </a>
        </nav>
      </div>
      <ThemeToggle />
    </header>
  );
}
