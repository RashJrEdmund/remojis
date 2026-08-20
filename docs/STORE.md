# Chrome Web Store listing draft

## Name

Remojis

## Short description (132 characters max)

Search, stack, and insert Unicode emoji. Categories, recents, skin tones — rendered with your OS font.

## Detailed description

Remojis is a searchable emoji keyboard for Chrome.

Open it from the toolbar or with Ctrl+Shift+E / ⌘⇧E. Search by name or keyword, browse categories, and click emoji to stack them in a compose bar. Hit Copy to put the whole string on your clipboard and insert it into the last text field you focused when the page allows it.

- Search by CLDR name, keywords, and shortcodes
- Multi-select compose bar (add many, then copy once)
- Browse Unicode categories and recently used emoji
- Skin-tone preference and adjustable emoji size
- Works offline — emoji data is bundled
- Native OS emoji (not a third-party emoji font)

If a site blocks insertion, paste with Ctrl/⌘+V. If a pasted emoji appears as a box, your operating system does not include that Unicode version yet.

Remojis does not collect browsing history or accounts. Preferences stay in local extension storage.

## Single purpose

Provide a searchable Unicode emoji picker that copies and inserts emoji.

## Permission justification

- **storage:** save recents, emoji size, and skin-tone preference on this device.
- **Host access (http/https content script):** remember the last focused text field so an emoji can be inserted after the popup takes focus. The script does not read or transmit page content.

## Build for upload

From the monorepo root:

```bash
pnpm install
pnpm build
```

Zip the contents of `apps/extension/dist` (the folder that contains `manifest.json`), then upload that zip in the Chrome Web Store developer console.

To also build the marketing site: `pnpm build:all`.

## Screenshots to capture

1. Popup: search “smile”, results grid
2. Compose bar with several stacked emoji + Copy
3. Category rail + recents after using a few emoji
4. Skin-tone control on people/body emoji
5. Settings: size S/M/L and recents count
6. Inserting into a GitHub comment box (before/after)
