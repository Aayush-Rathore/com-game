// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.comegameapp.com",
  devToolbar: {
    enabled: false,
  },

  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://www.comegameapp.com",
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
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
});
