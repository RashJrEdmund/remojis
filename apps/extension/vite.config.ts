import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { crx } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import manifest from './manifest.config.ts'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(rootDir, 'src'),
    },
  },
  plugins: [react(), tailwindcss(), crx({ manifest })],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
})
