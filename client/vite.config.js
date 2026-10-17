import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages sirve el sitio bajo /<repo>/; se define con VITE_BASE al construir.
  base: process.env.VITE_BASE || '/',
  server: { port: 4400, proxy: { '/api': 'http://localhost:4401' }, fs: { allow: ['..', '../..'] } },
});
