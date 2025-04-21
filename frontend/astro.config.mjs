// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Configuración para asegurar que todo se genere de forma estática
  output: 'static',
  // Modo de construcción estática
  build: {
    format: 'file'
  }
});
