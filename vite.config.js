import { defineConfig } from 'vite'

// When deploying to GitHub Pages under a repo such as
// https://<username>.github.io/hallowatch/ we need to set
// a base so that all asset URLs are generated relative to that
// path. The HTML can also use the special `%BASE_URL%` placeholder
// which will be replaced at build time.
export default defineConfig({
  // Use relative paths for the build so the output can be served from any
  // subdirectory (GitHub Pages repo, local file, etc.). A leading `/` would
  // force absolute URLs which can be misrouted on gh-pages and led to the
  // MIME-type issue when a CSS file got served instead of JS.
  base: './',
  server: {
    port: 5173,
    strictPort: false
  }
})