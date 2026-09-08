import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages mounts the static artifact at this prefix; keep prerender routes at root.
  base: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`,
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [vinext()],
});
