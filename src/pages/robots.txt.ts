import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site).toString();

  const robots = `
User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(robots.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
