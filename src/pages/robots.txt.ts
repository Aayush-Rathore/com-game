import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const robots = `
User-agent: *
Allow: /

Sitemap: ${site}sitemap-index.xml
`;

  return new Response(robots.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
