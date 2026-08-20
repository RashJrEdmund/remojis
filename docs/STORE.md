# Chrome Web Store listing draft

## Name

Remojis

## Short description (132 characters max)

Search, stack, and copy Unicode emoji. Categories, recents, skin tones — rendered with your OS font.

## Detailed description

Remojis is a searchable emoji keyboard for Chrome.

Open it from the toolbar or with Ctrl+Shift+E / ⌘⇧E. Search by name or keyword, browse categories, and click emoji to stack them in a compose bar. Hit Copy to put the whole string on your clipboard, then paste with Ctrl/⌘+V.

- Search by CLDR name, keywords, and shortcodes
- Multi-select compose bar (add many, then copy once)
- Browse Unicode categories and recently used emoji
- Skin-tone preference and adjustable emoji size
- Works offline — emoji data is bundled
- Native OS emoji (not a third-party emoji font)

If a pasted emoji appears as a box, your operating system does not include that Unicode version yet.

Remojis does not collect browsing history or accounts. Preferences stay in local extension storage.

## Single purpose

Provide a searchable Unicode emoji picker that copies emoji to the clipboard.

## Permission justification

- **storage:** save recents, emoji size, and skin-tone preference on this device.

## Build for distribution (GitHub Releases)

Chrome Web Store listing is deferred (one-time developer fee). Users install from GitHub:

```bash
pnpm install
pnpm build
```

Or push a version tag — CI builds and attaches the zip:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Zip the contents of `apps/extension/dist` (not the folder itself) when uploading manually.
