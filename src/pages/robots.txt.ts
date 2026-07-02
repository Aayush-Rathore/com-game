import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemapIndex = new URL("sitemap-index.xml", site).toString();
  const sitemapXml = new URL("sitemap.xml", site).toString();

  const robots = `User-agent: *
Allow: /

# Block redirect page from indexing
Disallow: /blog/comegame-how-it-works-features-gameplay-basics/

# Sitemap locations (both paths work)
Sitemap: ${sitemapIndex}
Sitemap: ${sitemapXml}
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
