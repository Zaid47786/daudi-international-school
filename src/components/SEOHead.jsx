import { useEffect } from "react";

/**
 * SEOHead — dynamically sets all critical <head> meta for each page.
 * Handles: title, description, canonical, OG tags, Twitter Card, JSON-LD schema.
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = "https://media.base44.com/images/public/user_68a720ca6a1156f1068d37b1/9fb988c1a_dis.png",
  ogType = "website",
  schema = null,
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | Daudi International School Muzaffarpur`
    : "Daudi International School Muzaffarpur | Best English Medium School in Bihar";

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper: find or create <meta>
    const setMeta = (attrKey, attrVal, content) => {
      let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Robots
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large");

    // Description
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }

    // OG
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", "Daudi International School Muzaffarpur");
    setMeta("property", "og:locale", "en_IN");
    if (canonical) setMeta("property", "og:url", canonical);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:image", ogImage);

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
      const s = document.getElementById("page-schema");
      if (s) s.remove();
      // Reset canonical to home on unmount
      const canon = document.querySelector('link[rel="canonical"]');
      if (canon) canon.setAttribute("href", "https://daudischool.in/");
    };
  }, [fullTitle, description, canonical, ogImage, ogType, schema, noindex]);

  return null;
}