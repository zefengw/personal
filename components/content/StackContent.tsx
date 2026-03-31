import { Breadcrumb } from "@/components/Breadcrumb";

const stackData = {
  runtime: {
    primary: ["TypeScript", "Ruby", "Go", "Python"],
    scripting: ["Bash", "Lua"],
  },
  frameworks: {
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Rails", "Express", "Gin"],
    mobile: ["React Native"],
  },
  infrastructure: {
    cloud: ["AWS", "GCP"],
    orchestration: ["Kubernetes", "Docker", "Terraform"],
    ci_cd: ["GitHub Actions", "ArgoCD"],
  },
  data: {
    databases: ["PostgreSQL", "Redis", "DynamoDB"],
    streaming: ["Kafka", "RabbitMQ"],
    monitoring: ["Datadog", "Prometheus", "Grafana"],
  },
};

function JsonBlock({
  label,
  data,
}: {
  label: string;
  data: Record<string, string[]>;
}) {
  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/5">
      <div className="font-mono text-[11px]">
        <span className="text-tertiary">&quot;{label}&quot;</span>
        <span className="text-on-surface-variant">: {"{"}</span>
        {Object.entries(data).map(([key, values], i) => (
          <div key={key} className="pl-6 mt-2">
            <span className="text-primary">&quot;{key}&quot;</span>
            <span className="text-on-surface-variant">: [</span>
            <div className="pl-6">
              {values.map((val, j) => (
                <span key={val}>
                  <span className="text-on-surface">&quot;{val}&quot;</span>
                  {j < values.length - 1 && (
                    <span className="text-on-surface-variant">, </span>
                  )}
                </span>
              ))}
            </div>
            <span className="text-on-surface-variant">]</span>
            {i < Object.entries(data).length - 1 && (
              <span className="text-on-surface-variant">,</span>
            )}
          </div>
        ))}
        <div className="mt-2">
          <span className="text-on-surface-variant">{"}"}</span>
        </div>
      </div>
    </div>
  );
}

export function StackContent() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 px-4 sm:px-8 md:px-12">
      <Breadcrumb fileId="stack-config" />

      <section className="mb-20">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
          Stack
          <br />
          <span className="text-tertiary">Config.</span>
        </h1>
        <p className="max-w-xl font-body text-lg text-on-surface-variant leading-relaxed">
          Runtime configuration for the engineering toolkit. A comprehensive map
          of languages, frameworks, and infrastructure that powers the work.
        </p>
      </section>

      <div className="space-y-8">
        <div className="font-mono text-xs text-on-surface-variant mb-4">
          <span className="text-primary">$</span> cat stack_config.json
        </div>

        <div className="bg-surface-container-low p-8 border border-outline-variant/5">
          <div className="font-mono text-[11px] text-on-surface-variant mb-4">
            {"{"}
          </div>
          <div className="space-y-6">
            {Object.entries(stackData).map(([key, data]) => (
              <JsonBlock key={key} label={key} data={data} />
            ))}
          </div>
          <div className="font-mono text-[11px] text-on-surface-variant mt-4">
            {"}"}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {Object.entries(stackData).map(([category, data]) => (
            <div
              key={category}
              className="bg-surface-container-high p-4 border border-outline-variant/5"
            >
              <h4 className="font-label text-[10px] uppercase tracking-widest text-tertiary mb-3 font-bold">
                {category}
              </h4>
              <p className="font-mono text-2xl font-bold text-on-surface">
                {Object.values(data).flat().length}
              </p>
              <p className="font-label text-[10px] text-on-surface-variant mt-1">
                technologies
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-40 pt-16 border-t border-outline-variant/10 text-center">
        <p className="font-label text-xs uppercase tracking-[0.4em] text-on-surface-variant">
          Last synced: 2024.12.15
        </p>
      </footer>
    </div>
  );
}
