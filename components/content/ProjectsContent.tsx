import { Breadcrumb } from "@/components/Breadcrumb";

const projects = [
  {
    name: "Nexus",
    tagline: "Real-time Collaborative Code Editor",
    description:
      "A multiplayer code editing environment built on Conflict-free Replicated Data Types (CRDTs). Supports sub-50ms synchronization across distributed peers with offline-first architecture and operational transform fallback.",
    tech: ["RUST", "WEBASSEMBLY", "TYPESCRIPT", "WEBSOCKETS"],
    status: "ACTIVE",
    year: "2024",
    highlights: [
      "Sub-50ms peer synchronization using custom CRDT implementation",
      "WebAssembly-powered text buffer achieving 10x faster operations than pure JS",
      "Plugin system with sandboxed execution contexts for third-party extensions",
    ],
  },
  {
    name: "Pulse",
    tagline: "Lightweight Observability Toolkit",
    description:
      "An opinionated observability stack for microservice architectures. Combines distributed tracing, metric aggregation, and intelligent alerting with a focus on minimal resource overhead.",
    tech: ["GO", "PROMETHEUS", "GRAFANA", "OPENTELEMETRY"],
    status: "ACTIVE",
    year: "2023",
    highlights: [
      "90% reduction in observability infrastructure costs vs. commercial alternatives",
      "Custom query language for cross-service trace correlation",
      "Automated anomaly detection using statistical process control",
    ],
  },
  {
    name: "Chromatic",
    tagline: "Design Token Pipeline",
    description:
      "An automated pipeline that ingests design tokens from Figma, transforms them through a configurable middleware chain, and outputs platform-specific code (CSS, Swift, Kotlin) with full type safety.",
    tech: ["TYPESCRIPT", "REACT", "FIGMA API", "AST"],
    status: "ARCHIVED",
    year: "2022",
    highlights: [
      "Reduced design-to-development handoff time from 2 weeks to 2 hours",
      "AST-based code generation ensuring zero-drift between design and implementation",
      "Adopted by 3 external teams after internal open-source release",
    ],
  },
];

export function ProjectsContent() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 px-4 sm:px-8 md:px-12">
      <Breadcrumb fileId="featured-projects" />

      <section className="mb-20">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
          Project
          <br />
          <span className="text-primary">Vault.</span>
        </h1>
        <p className="max-w-xl font-body text-lg text-on-surface-variant leading-relaxed">
          A curated selection of open-source work and technical experiments.
          Each project represents a distinct problem space explored through
          engineering rigor.
        </p>
      </section>

      <div className="space-y-32">
        {projects.map((project, idx) => (
          <article key={project.name} className="relative pl-0 md:pl-12 group">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-outline-variant/20" />
            <div
              className={`hidden md:block absolute left-[-4px] top-2 w-2 h-2 rounded-full ring-4 ring-surface transition-colors ${
                project.status === "ACTIVE"
                  ? "bg-primary"
                  : "bg-outline-variant group-hover:bg-primary"
              }`}
            />

            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
                    {project.name}
                  </h2>
                  <span className="font-label text-[9px] text-on-surface-variant opacity-60">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="font-label text-sm text-tertiary font-medium uppercase tracking-widest">
                  {project.tagline}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-label text-[10px] uppercase tracking-widest ${
                    project.status === "ACTIVE"
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  &#9679; {project.status}
                </span>
                <div className="font-label text-xs text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-sm border border-outline-variant/10">
                  {project.year}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  {project.description}
                </p>
                <ul className="space-y-4 text-on-surface-variant">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start">
                      <span className="material-symbols-outlined text-primary text-sm mt-1 mr-3">
                        arrow_right_alt
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4 space-y-6">
                <div className="bg-surface-container-low p-6 border border-outline-variant/5">
                  <h4 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 font-bold">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-surface-container-highest text-[10px] font-mono text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-sm h-32 border border-outline-variant/20 bg-surface-container-low">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-tertiary/5" />
                  <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 font-mono text-[9px] text-on-surface-variant">
                    {project.name.toUpperCase()}_ARCH.SVG
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-40 pt-16 border-t border-outline-variant/10 text-center">
        <p className="font-label text-xs uppercase tracking-[0.4em] text-on-surface-variant mb-8">
          End of Archive
        </p>
        <button className="px-8 py-3 border border-outline-variant/30 text-on-surface font-bold text-sm tracking-tight hover:bg-surface-container-high transition-all rounded-sm">
          VIEW_ON_GITHUB.SH
        </button>
      </footer>
    </div>
  );
}
