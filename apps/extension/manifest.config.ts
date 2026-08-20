import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json' with { type: 'json' }

export default defineManifest({
  manifest_version: 3,
  name: 'Remojis',
  version: pkg.version,
  description:
    'Search, copy, and insert emoji into the page. A fast Unicode emoji keyboard for Chrome.',
  icons: {
    16: 'icons/icon16.png',
    32: 'icons/icon32.png',
    48: 'icons/icon48.png',
    128: 'icons/icon128.png',
  },
  action: {
    default_title: 'Remojis',
    default_popup: 'src/popup/index.html',
    default_icon: {
      16: 'icons/icon16.png',
      32: 'icons/icon32.png',
      48: 'icons/icon48.png',
    },
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['src/content/index.ts'],
      matches: ['http://*/*', 'https://*/*'],
      run_at: 'document_idle',
    },
  ],
  permissions: ['storage'],
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Ctrl+Shift+E',
        mac: 'Command+Shift+E',
      },
      description: 'Open Remojis',
    },
  },
})
