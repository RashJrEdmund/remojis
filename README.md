![image preview](./apps/website/public/og-image.png)

# Remojis

Search, stack, and insert Unicode emoji from a Chrome toolbar popup — without fighting the OS picker.

Remojis is a Manifest V3 Chrome extension (plus a marketing site in the same monorepo). Inspired by the *jobs* of [EmojiCopy](https://emojicopy.com/) and [JoyPixels’ keyboard](https://chromewebstore.google.com/detail/emoji-keyboard-by-joypixe/ipdjnhgkpapgippgcgkfcbpdpcgifncb), not their artwork or branding. Glyphs render with **your OS emoji font**; data comes from [emojibase-data](https://emojibase.dev/) (Emoji / Unicode 17).

## Why it exists

System emoji pickers are slow to open, weak at search, and often close after one character. Remojis stays in the toolbar: find an emoji in a couple of seconds, stack several in a compose bar, then copy — and insert into the last text field you were using when the page allows it.

## What it does

- **Search** by CLDR name, keywords, and shortcodes (`fire`, `:rocket:`, …)
- **Browse** Unicode categories (smileys, people, food, flags, …) plus **recents**
- **Multi-select compose bar** — click to add, clear with ×, **Copy** when ready
- **Insert** into the last focused `input` / `textarea` / `contenteditable` when possible; otherwise clipboard only
- **Skin-tone** default, **emoji size** S/M/L, adjustable recents count
- **Offline** — emoji dataset is bundled; no account, no cloud sync
- **Shortcut:** Ctrl+Shift+E / ⌘⇧E

If paste shows an empty box, your OS may not include that Unicode version yet.

## Privacy

Preferences (recents, size, skin tone) stay in `chrome.storage.local` on your device. See [PRIVACY.md](PRIVACY.md). A content script only remembers the last focused editable so insert can work after the popup steals focus; it does not send page content anywhere.

## Monorepo

| Package | Path | Description |
| --- | --- | --- |
| `@remojis/extension` | [`apps/extension`](apps/extension) | Chrome emoji keyboard (Vite + React + CRXJS) |
| `@remojis/website` | [`apps/website`](apps/website) | One-page marketing site |

```bash
pnpm install
```

### Extension

```bash
pnpm dev              # same as pnpm dev:extension
pnpm build            # production build → apps/extension/dist
pnpm icons            # resize root logo.png → extension icons + website favicon
```

1. Open `chrome://extensions` → enable Developer mode  
2. **Load unpacked** → select [`apps/extension/dist`](apps/extension/dist)  
3. For HMR, keep `pnpm dev` running and reload the extension if Chrome doesn’t pick up changes  

### Website

```bash
pnpm dev:website
pnpm build:website
```

### Both apps

```bash
pnpm build:all
pnpm lint
```

## Stack

- **Extension:** Vite, React, TypeScript, Tailwind CSS, [`@crxjs/vite-plugin`](https://crxjs.dev/) (MV3), `@tanstack/react-virtual`, `emojibase` / `emojibase-data`
- **Website:** Vite, React, TypeScript, Tailwind CSS

## Docs

- [docs/PLAN.md](docs/PLAN.md) — product / engineering notes  
- [docs/STORE.md](docs/STORE.md) — Chrome Web Store listing draft  
- [NOTICE](NOTICE) — third-party licenses  

## License

MIT for this project. Unicode characters are part of the Unicode Standard. Remojis does **not** ship JoyPixels or other commercial emoji artwork.
