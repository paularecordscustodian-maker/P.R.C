import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://paularecordscustodian.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  output: 'static',
  adapter: cloudflare(),
});
