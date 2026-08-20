# Icons & brand assets

How Remojis turns the master logo into extension icons and the site favicon.

## Master logo

| File | Role |
| --- | --- |
| [`logo.png`](../logo.png) (repo root) | Source brand mark. Prefer a square PNG with transparency. |

Chrome and the website **do not** read this file directly. They use the generated sizes below.

## Generate sizes

```bash
pnpm icons
```

That runs [`apps/extension/scripts/generate-icons.mjs`](../apps/extension/scripts/generate-icons.mjs) via the `@remojis/extension` package. It uses [sharp](https://sharp.pixelplumbing.com/) to resize `logo.png`.

### What it writes

| Output | Size | Used by |
| --- | --- | --- |
| `apps/extension/public/icons/icon16.png` | 16×16 | Chrome toolbar (manifest) |
| `apps/extension/public/icons/icon32.png` | 32×32 | Chrome toolbar |
| `apps/extension/public/icons/icon48.png` | 48×48 | Chrome toolbar / management UI |
| `apps/extension/public/icons/icon128.png` | 128×128 | Chrome Web Store / install |
| `apps/website/public/favicon.png` | 32×32 | Site tab icon (copied from `icon32`) |

Manifest paths are set in [`apps/extension/manifest.config.ts`](../apps/extension/manifest.config.ts).

### After changing the logo

1. Replace root `logo.png`
2. `pnpm icons`
3. Rebuild / reload the extension (`pnpm build` or `pnpm dev`)
4. Hard-refresh the website so the favicon updates

## Website social / meta images

These are **not** produced by `pnpm icons`. Keep or update them by hand under `apps/website/public/`:

| File | Purpose |
| --- | --- |
| `favicon.png` | Tab icon (also overwritten by `pnpm icons`) |
| `og-image.png` | Open Graph + Twitter card (`index.html` meta tags) |

If you customize the favicon separately from the extension icons, either stop copying in the script or re-apply your custom file after `pnpm icons`.

## Why a script?

Chrome expects multiple fixed sizes. Generating them from one master file keeps the brand consistent and avoids hand-exporting four PNGs every time the mark changes.
