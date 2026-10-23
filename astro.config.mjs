// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// GitHub Pages user-site repository: ChaserFrank.github.io
// If this moves to a project repository, change base to "/<repository-name>".
export default defineConfig({
  site: "https://chaserfrank.github.io",
  base: "/",
  integrations: [tailwind(), react()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    host: true,
    port: 4321,
  },
});
