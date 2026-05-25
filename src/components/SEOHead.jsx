import { useEffect } from "react";

/**
 * SEOHead — dynamically updates <head> meta tags for each page.
 * Usage: <SEOHead title="..." description="..." canonical="..." />
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = "https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png",
  schema = null,
}) {
  const fullTitle = title
    ? `${title} | Daudi International School Muzaffarpur`
    : "Daudi International School Muzaffarpur | Best English Medium School in Bihar";

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set/create meta
    const setMeta = (selector, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.includes("property") ? "property" : "name";
        const val = selector.match(/["']([^"']+)["']/)?.[1];
        if (attr && val) el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[name="twitter:title"]', fullTitle);
    if (ogImage) setMeta('meta[property="og:image"]', ogImage);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // JSON-LD schema
    let schemaScript = document.getElementById("page-schema");
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "page-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // On unmount, clean up page-specific schema
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, [fullTitle, description, canonical, ogImage, schema]);

  return null;
}