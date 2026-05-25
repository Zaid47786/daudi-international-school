import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/**
 * Breadcrumb — renders accessible breadcrumb nav + JSON-LD BreadcrumbList schema.
 * crumbs: [{ label, path }]  — last item has no path (current page)
 */
export default function Breadcrumb({ crumbs = [] }) {
  const all = [{ label: "Home", path: "/" }, ...crumbs];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.path ? `https://daudischool.in${c.path}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-4 pb-1">
        <ol className="flex items-center flex-wrap gap-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={11} style={{ opacity: 0.4 }} />}
                {isLast ? (
                  <span style={{ color: "rgba(255,255,255,0.75)" }} aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {i === 0 && <Home size={11} />}
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}