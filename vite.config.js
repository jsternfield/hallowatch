import { defineConfig } from 'vite'

// When deploying to GitHub Pages under a repo such as
// https://<username>.github.io/hallowatch/ we need to set
// a base so that all asset URLs are generated relative to that
// path. The HTML can also use the special `%BASE_URL%` placeholder
// which will be replaced at build time.
export default defineConfig({
  base: '/hallowatch/',
  server: {
    port: 5173,
    strictPort: false
  }
})