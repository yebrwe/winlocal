import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://winlocal.kr",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/design"),
    }),
  ],
});
