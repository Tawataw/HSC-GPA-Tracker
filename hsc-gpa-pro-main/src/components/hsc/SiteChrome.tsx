import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/lib/theme";

const navLink =
  "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg print:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
          <span className="gradient-hero grid size-9 place-items-center rounded-xl text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-bold leading-tight">
            HSC GPA <span className="gradient-text">Analyzer BD</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <Link to="/" className={navLink} activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/calculator" className={navLink} activeProps={{ className: "text-foreground" }}>
            Calculator
          </Link>
          <Link to="/how-it-works" className={navLink} activeProps={{ className: "text-foreground" }}>
            Rules
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 print:hidden">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6">
        <p>
          HSC GPA Analyzer BD — an unofficial study tool for Bangladesh HSC Science students.
          Results are estimates based on your own expected marks.
        </p>
      </div>
    </footer>
  );
}
