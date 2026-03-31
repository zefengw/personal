import { Breadcrumb } from "@/components/Breadcrumb";

export function ExperienceContent() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 px-4 sm:px-8 md:px-12">
      <Breadcrumb fileId="experience" />

      <section className="mb-20">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
          Engineering
          <br />
          <span className="text-primary">Editorial.</span>
        </h1>
        <p className="max-w-xl font-body text-lg text-on-surface-variant leading-relaxed">
          A longitudinal log of technical contributions, system architecture,
          and product leadership across high-growth engineering ecosystems.
        </p>
      </section>

      <div className="space-y-32">
        {/* Role 01: Stripe */}
        <article className="relative pl-0 md:pl-12 group">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-outline-variant/20" />
          <div className="hidden md:block absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary ring-4 ring-surface" />

          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4">
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight mb-1">
                Stripe
              </h2>
              <p className="font-label text-sm text-tertiary font-medium uppercase tracking-widest">
                Senior Software Engineer &bull; Payments Infrastructure
              </p>
            </div>
            <div className="font-label text-xs text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-sm border border-outline-variant/10">
              2021 &mdash; PRESENT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Leading the evolution of the global clearing house engine.
                Architected a low-latency reconciliation pipeline handling $2B+
                in daily transaction volume with 99.999% consistency.
              </p>
              <ul className="space-y-4 text-on-surface-variant">
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-1 mr-3">
                    arrow_right_alt
                  </span>
                  <span>
                    Reduced settlement latency by 45% by implementing a
                    distributed caching layer using Redis and customized
                    Protobuf serialization.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-1 mr-3">
                    arrow_right_alt
                  </span>
                  <span>
                    Mentored a team of 6 engineers on high-concurrency Ruby and
                    Go patterns, establishing new standards for
                    service-to-service communication.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-1 mr-3">
                    arrow_right_alt
                  </span>
                  <span>
                    Designed and deployed an automated disaster recovery
                    protocol that cut mean-time-to-recovery (MTTR) from 15
                    minutes to 45 seconds.
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="bg-surface-container-low p-6 border border-outline-variant/5">
                <h4 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 font-bold">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["RUBY", "GOLANG", "AWS", "KAFKA", "REDIS"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-surface-container-highest text-[10px] font-mono text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-sm h-32 border border-outline-variant/20 bg-surface-container-low">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary-container/20" />
                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 font-mono text-[9px] text-on-surface-variant">
                  METRIC_VIZ_01.PNG
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Role 02: Airbnb */}
        <article className="relative pl-0 md:pl-12 group">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-outline-variant/20" />
          <div className="hidden md:block absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-outline-variant ring-4 ring-surface group-hover:bg-primary transition-colors" />

          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4">
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight mb-1">
                Airbnb
              </h2>
              <p className="font-label text-sm text-tertiary font-medium uppercase tracking-widest">
                Full Stack Engineer &bull; Host Experience
              </p>
            </div>
            <div className="font-label text-xs text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-sm border border-outline-variant/10">
              2018 &mdash; 2021
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Contributed to the core Airbnb design system (DLS) and built
                critical hosting tools. Focused on creating highly performant,
                accessible UI components used by millions of hosts globally.
              </p>
              <ul className="space-y-4 text-on-surface-variant">
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-1 mr-3">
                    arrow_right_alt
                  </span>
                  <span>
                    Re-engineered the listing editor flow using React and Apollo
                    GraphQL, resulting in a 20% increase in listing completion
                    rates.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-1 mr-3">
                    arrow_right_alt
                  </span>
                  <span>
                    Optimized client-side bundle size by 30% through aggressive
                    code-splitting and migration to a centralized asset delivery
                    pipeline.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary text-sm mt-1 mr-3">
                    arrow_right_alt
                  </span>
                  <span>
                    Developed an internal A/B testing framework that allowed
                    product managers to deploy experiments without developer
                    intervention.
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="bg-surface-container-low p-6 border border-outline-variant/5">
                <h4 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 font-bold">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["TYPESCRIPT", "REACT", "GRAPHQL", "NODE.JS"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-surface-container-highest text-[10px] font-mono text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-sm h-32 border border-outline-variant/20 bg-surface-container-low">
                <div className="absolute inset-0 bg-linear-to-br from-tertiary/5 to-surface-container-highest/30" />
                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 font-mono text-[9px] text-on-surface-variant">
                  ASSET_PREVIEW_09.JPG
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <footer className="mt-40 pt-16 border-t border-outline-variant/10 text-center">
        <p className="font-label text-xs uppercase tracking-[0.4em] text-on-surface-variant mb-8">
          End of Log
        </p>
        <div className="inline-flex space-x-4">
          <button className="px-8 py-3 bg-primary text-on-primary font-bold text-sm tracking-tight hover:brightness-110 transition-all rounded-sm">
            DOWNLOAD_CV.PDF
          </button>
          <button className="px-8 py-3 border border-outline-variant/30 text-on-surface font-bold text-sm tracking-tight hover:bg-surface-container-high transition-all rounded-sm">
            CONTACT_ME.SH
          </button>
        </div>
      </footer>
    </div>
  );
}
