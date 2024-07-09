import { defineConfig } from "astro/config";
import { defaultLayout } from "astro-default-layout";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [defaultLayout],
    extendDefaultPlugins: true,
  },
});
