import { Breadcrumb } from "@/components/Breadcrumb";

export function ResumeContent() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 px-4 sm:px-8 md:px-12">
      <Breadcrumb fileId="resume" />

      <section className="mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
          Curriculum
          <br />
          <span className="text-primary">Vitae.</span>
        </h1>
        <p className="max-w-xl font-body text-lg text-on-surface-variant leading-relaxed mb-8">
          A formal record of professional experience, education, and technical
          competencies.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-primary text-on-primary font-bold text-sm tracking-tight hover:brightness-110 transition-all rounded-sm">
            DOWNLOAD_CV.PDF
          </button>
          <button className="px-8 py-3 border border-outline-variant/30 text-on-surface font-bold text-sm tracking-tight hover:bg-surface-container-high transition-all rounded-sm">
            PRINT_CV.SH
          </button>
        </div>
      </section>

      {/* Resume preview area */}
      <div className="bg-surface-container-low border border-outline-variant/5 p-8 md:p-12 min-h-[60vh]">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-outline-variant/10">
          <span className="material-symbols-outlined text-error">
            picture_as_pdf
          </span>
          <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
            resume.pdf &mdash; Preview Mode
          </span>
        </div>

        {/* Placeholder for uploaded resume */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-surface-container-high border border-outline-variant/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
              upload_file
            </span>
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface mb-2">
            Upload Your Resume
          </h3>
          <p className="text-on-surface-variant text-sm max-w-sm mb-6">
            Drop a PDF file here or click to upload. The resume will be rendered
            inline for visitors to preview.
          </p>
          <button className="px-6 py-2.5 border border-outline-variant/30 text-on-surface font-label text-xs uppercase tracking-widest hover:bg-surface-container-high transition-all rounded-sm">
            SELECT_FILE
          </button>
        </div>
      </div>

      <footer className="mt-20 pt-16 border-t border-outline-variant/10 text-center">
        <p className="font-label text-xs uppercase tracking-[0.4em] text-on-surface-variant">
          Last updated: 2024.12.01
        </p>
      </footer>
    </div>
  );
}
