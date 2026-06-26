import { defineConfig } from "vite";

// Vite is our dev server and bundler. The important bit for kids:
// when you save a file, the browser updates almost instantly (HMR).
// That fast feedback loop is the whole point — edit, save, see it.
export default defineConfig({
  server: {
    open: true,
  },
});
