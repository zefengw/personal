import { Breadcrumb } from "@/components/Breadcrumb";
import { socialLinks } from "@/components/TabBar";

interface AboutContentProps {
  onNavigate?: (fileId: string) => void;
}

export function AboutContent({ onNavigate }: AboutContentProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 px-4 sm:px-8 md:px-12">
      <Breadcrumb fileId="about" />

      <section className="mb-20">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
          Hello,
          <br />
          <span className="text-primary">World.</span>
        </h1>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        {/* Profile picture area */}
        <div className="md:col-span-4">
          <div className="relative aspect-square bg-surface-container-low border border-outline-variant/10 overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-tertiary/5" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant/30">
              <span className="material-symbols-outlined text-5xl mb-3">
                person
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest">
                profile_img.png
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-background/80 to-transparent">
              <div className="font-mono text-[9px] text-on-surface-variant">
                AVATAR_01.PNG
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-8">
          <div className="mb-8">
            <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight mb-1">
              Your Name
            </h2>
            <p className="font-label text-sm text-tertiary font-medium uppercase tracking-widest mb-6">
              Software Engineer &bull; Builder &bull; Writer
            </p>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p>
                I&apos;m a software engineer passionate about building tools
                that make developers more productive. Currently focused on
                distributed systems, developer experience, and the craft of
                writing clean, maintainable code.
              </p>
              <p>
                Previously, I&apos;ve worked at companies like Stripe and
                Airbnb, where I contributed to payment infrastructure and design
                systems used by millions. I believe in the intersection of
                engineering rigor and thoughtful design.
              </p>
              <p>
                When I&apos;m not coding, I write about software architecture,
                engineering culture, and the lessons learned from building at
                scale.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-surface-container-low p-6 border border-outline-variant/5">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 font-bold">
              Quick Navigation
            </h4>
            <div className="space-y-2">
              {[
                {
                  icon: "work",
                  label: "Work Experience",
                  desc: "Engineering roles and contributions",
                  fileId: "experience",
                },
                {
                  icon: "deployed_code",
                  label: "Projects",
                  desc: "Open-source work and experiments",
                  fileId: "featured-projects",
                },
                {
                  icon: "edit_note",
                  label: "Writing",
                  desc: "Technical articles and dev notes",
                  fileId: "articles",
                },
                {
                  icon: "picture_as_pdf",
                  label: "Resume",
                  desc: "Download or view CV",
                  fileId: "resume",
                },
              ].map((link) => (
                <button
                  key={link.fileId}
                  onClick={() => onNavigate?.(link.fileId)}
                  className="w-full flex items-center gap-4 p-3 hover:bg-surface-container-high/50 transition-colors duration-150 text-left group"
                >
                  <span className="material-symbols-outlined text-primary text-sm">
                    {link.icon}
                  </span>
                  <div className="flex-1">
                    <div className="text-on-surface text-sm font-medium group-hover:text-primary transition-colors">
                      {link.label}
                    </div>
                    <div className="text-on-surface-variant text-xs">
                      {link.desc}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant/30 group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status section */}
      <div className="border-t border-outline-variant/10 pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Location", value: "San Francisco, CA" },
          { label: "Status", value: "Open to opportunities" },
          { label: "Focus", value: "Distributed Systems" },
          { label: "Experience", value: "6+ years" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-surface-container-high p-4 border border-outline-variant/5"
          >
            <h4 className="font-label text-[10px] uppercase tracking-widest text-tertiary mb-2 font-bold">
              {item.label}
            </h4>
            <p className="text-on-surface text-sm font-medium">{item.value}</p>
          </div>
        ))}
      </div>

      <footer className="mt-40 pt-16 border-t border-outline-variant/10 text-center">
        <div className="flex flex-col items-center gap-4 mb-10">
          <h4 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            Connect
          </h4>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="p-2.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-high/50 transition-colors duration-150 border border-outline-variant/10"
              >
                <link.icon />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
