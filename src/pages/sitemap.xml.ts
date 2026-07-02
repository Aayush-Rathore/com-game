import type { APIRoute } from "astro";

// Redirect /sitemap.xml → /sitemap-index.xml
// Google Search Console and SEO tools commonly request /sitemap.xml
export const GET: APIRoute = ({ site }) => {
  const sitemapIndexUrl = new URL("sitemap-index.xml", site).toString();

  return new Response(null, {
    status: 301,
    headers: {
      Location: sitemapIndexUrl,
      "Cache-Control": "public, max-age=86400",
    },
  });
};
