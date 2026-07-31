import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://paularecordscustodian.com',
  trailingSlash: 'never',
  build: { format: 'file' },
});
