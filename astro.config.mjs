// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

const SITE = "https://com-game.vercel.app";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  devToolbar: {
    enabled: false,
  },

  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: SITE,
      }),
      PUBLIC_AFFILIATE_URL: envField.string({
        context: "client",
        access: "public",
        default:
          "https://web-in.comegamehub.com/en/affiliate-invited?c=5DAGYXA3&s=3",
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // Exclude the redirect page from being indexed
      filter: (page) =>
        !page.endsWith("/blog/comegame-how-it-works-features-gameplay-basics/"),

      serialize(item) {
        // Use pathname for matching — works with any domain
        const path = new URL(item.url).pathname;
        const today = new Date().toISOString().split("T")[0];

        // Homepage
        if (path === "/") {
          return { ...item, changefreq: "daily", priority: 1.0, lastmod: today };
        }

        // Blog index
        if (path === "/blog/") {
          return { ...item, changefreq: "daily", priority: 0.9, lastmod: today };
        }

        // Core money/game pages
        if (["/come-games/", "/download-come-games-app/", "/real-money-come-games/"].includes(path)) {
          return { ...item, changefreq: "weekly", priority: 0.9, lastmod: "2026-07-01" };
        }

        // New blog posts (July 2026)
        if (
          [
            "/blog/comegame-bonus-guide-india/",
            "/blog/comegame-withdrawal-guide/",
            "/blog/comegame-account-setup-guide/",
            "/blog/comegame-skill-games-explained/",
          ].includes(path)
        ) {
          return { ...item, changefreq: "monthly", priority: 0.85, lastmod: "2026-07-01" };
        }

        // All other blog posts
        if (path.startsWith("/blog/")) {
          return { ...item, changefreq: "monthly", priority: 0.8, lastmod: "2026-07-01" };
        }

        // Support / info pages
        if (["/faq/", "/responsible-gaming/", "/about/", "/contact/"].includes(path)) {
          return { ...item, changefreq: "monthly", priority: 0.7, lastmod: "2026-07-01" };
        }

        // Legal pages — rarely change
        if (["/privacy-policy/", "/terms-and-conditions/", "/disclaimer/"].includes(path)) {
          return { ...item, changefreq: "yearly", priority: 0.3, lastmod: "2026-01-01" };
        }

        // Fallback
        return { ...item, changefreq: "monthly", priority: 0.6 };
      },
    }),
  ],
});
