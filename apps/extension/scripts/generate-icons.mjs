/**
 * Generate Remojis toolbar / store icons from the brand logo.
 *
 * Source:  repo-root `logo.png` (square PNG with transparency preferred)
 * Outputs:
 *   - apps/extension/public/icons/icon{16,32,48,128}.png  (Chrome manifest)
 *   - apps/website/public/favicon.png                     (copy of 32×32)
 *
 * Run from the monorepo root:
 *   pnpm icons
 *
 * Or from this package:
 *   pnpm --filter @remojis/extension icons
 *
 * Requires `sharp` (devDependency of @remojis/extension).
 * Replace `logo.png`, then re-run this script whenever the brand mark changes.
 *
 * See docs/ICONS.md for sizes, Chrome requirements, and website OG assets.
 */

import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const extensionRoot = join(scriptDir, '..')
const repoRoot = join(extensionRoot, '../..')
const logoPath = join(repoRoot, 'logo.png')
const outDir = join(extensionRoot, 'public/icons')
const websiteFavicon = join(repoRoot, 'apps/website/public/favicon.png')

const sizes = [16, 32, 48, 128]

mkdirSync(outDir, { recursive: true })

for (const size of sizes) {
  const dest = join(outDir, `icon${size}.png`)
  await sharp(logoPath)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(dest)
  console.log('wrote', dest)
}

copyFileSync(join(outDir, 'icon32.png'), websiteFavicon)
console.log('wrote', websiteFavicon)
