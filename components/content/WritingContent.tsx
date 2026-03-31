import { Breadcrumb } from "@/components/Breadcrumb";

const articles = [
  {
    title: "Building Resilient Distributed Systems",
    date: "2024.09.15",
    readTime: "12 min",
    tags: ["SYSTEMS DESIGN", "DISTRIBUTED", "ARCHITECTURE"],
    preview:
      "A deep-dive into the patterns that make distributed systems survive the inevitable: network partitions, cascading failures, and the human operator at 3 AM. Drawing from real incidents and the engineering decisions that prevented — or caused — them.",
    status: "PUBLISHED",
  },
  {
    title: "The Case for Monorepos at Scale",
    date: "2024.03.22",
    readTime: "8 min",
    tags: ["DEVELOPER EXPERIENCE", "TOOLING", "INFRASTRUCTURE"],
    preview:
      "Why large engineering organizations are converging on monorepo architectures, and the tooling ecosystem that makes it viable. A comparative analysis of Bazel, Turborepo, and Nx through the lens of a 500-engineer organization.",
    status: "PUBLISHED",
  },
  {
    title: "Rethinking State Management in React",
    date: "2023.11.08",
    readTime: "10 min",
    tags: ["REACT", "FRONTEND", "PATTERNS"],
    preview:
      "The evolution from Redux to server components, and why the best state management strategy might be having less state to manage. An exploration of colocation, URL state, and the server-client boundary.",
    status: "PUBLISHED",
  },
  {
    title: "On the Craft of Code Review",
    date: "2023.07.14",
    readTime: "6 min",
    tags: ["ENGINEERING CULTURE", "PRACTICES"],
    preview:
      "Code review as a design activity, not a gatekeeping ritual. Concrete techniques for giving feedback that improves both the code and the engineer, drawn from five years of reviewing pull requests across teams.",
    status: "PUBLISHED",
  },
  {
    title: "Zero-Downtime Deployments: Beyond Blue-Green",
    date: "2023.04.01",
    readTime: "15 min",
    tags: ["DEVOPS", "INFRASTRUCTURE", "SRE"],
    preview:
      "Advanced deployment strategies for stateful services: canary with automatic rollback, traffic shadowing, and database migration patterns that don't wake up the on-call engineer.",
    status: "DRAFT",
  },
];

export function WritingContent() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 px-4 sm:px-8 md:px-12">
      <Breadcrumb fileId="articles" />

      <section className="mb-20">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
          Dev
          <br />
          <span className="text-primary">Notes.</span>
        </h1>
        <p className="max-w-xl font-body text-lg text-on-surface-variant leading-relaxed">
          Technical writings on software engineering, system architecture, and
          the craft of building software that endures.
        </p>
      </section>

      <div className="space-y-2">
        {articles.map((article, idx) => (
          <article
            key={article.title}
            className="group cursor-pointer border border-outline-variant/5 hover:border-outline-variant/20 transition-all duration-300"
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-label text-[9px] text-on-surface-variant opacity-40">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-headline text-xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed text-sm mt-3">
                    {article.preview}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 md:ml-8">
                  <span
                    className={`font-label text-[10px] uppercase tracking-widest ${
                      article.status === "DRAFT"
                        ? "text-tertiary"
                        : "text-on-surface-variant opacity-60"
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-outline-variant/5">
                <span className="font-label text-[10px] text-on-surface-variant">
                  {article.date}
                </span>
                <span className="text-outline-variant/30">|</span>
                <span className="font-label text-[10px] text-on-surface-variant">
                  {article.readTime}
                </span>
                <span className="text-outline-variant/30">|</span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-surface-container-highest text-[9px] font-mono text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-40 pt-16 border-t border-outline-variant/10 text-center">
        <p className="font-label text-xs uppercase tracking-[0.4em] text-on-surface-variant mb-8">
          {articles.length} entries &bull;{" "}
          {articles.filter((a) => a.status === "PUBLISHED").length} published
        </p>
        <button className="px-8 py-3 border border-outline-variant/30 text-on-surface font-bold text-sm tracking-tight hover:bg-surface-container-high transition-all rounded-sm">
          SUBSCRIBE_RSS.XML
        </button>
      </footer>
    </div>
  );
}
