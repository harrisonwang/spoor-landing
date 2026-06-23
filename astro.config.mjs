import { defineConfig } from "astro/config";

// Bilingual (zh / en) static site. zh is the default locale and is served
// from the site root via the redirect in src/pages/index.astro.
export default defineConfig({
  site: "https://spoor.sh",
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: { prefixDefaultLocale: true },
  },
});
