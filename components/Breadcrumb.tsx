import { getBreadcrumb } from "@/lib/data";

export function Breadcrumb({ fileId }: { fileId: string }) {
  const crumbs = getBreadcrumb(fileId);
  return (
    <div className="flex items-center space-x-2 mb-8 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center space-x-2">
          {i > 0 && (
            <span className="material-symbols-outlined text-xs mr-2">
              chevron_right
            </span>
          )}
          <span className={i === crumbs.length - 1 ? "text-primary" : ""}>
            {crumb}
          </span>
        </span>
      ))}
    </div>
  );
}
