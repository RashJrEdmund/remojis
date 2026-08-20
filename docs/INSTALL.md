# Install Remojis (unpacked)

Chrome Web Store publishing requires a one-time developer fee. Until Remojis is listed there, install from **GitHub Releases**.

## Download

1. Open the [latest release](https://github.com/RashJrEdmund/remojis/releases/latest)
2. Download `remojis-extension-vX.Y.Z.zip` (or the zip attached to that release)
3. Unzip it somewhere permanent (not your Downloads folder if you clean that often)  
   You should see `manifest.json` inside the unzipped folder.

## Load in Chrome

1. Open Chrome and go to `chrome://extensions`
2. Turn on **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the **unzipped folder** (the one that contains `manifest.json`)
5. Pin Remojis from the puzzle-piece extensions menu if you want it on the toolbar

## Use it

- Click the Remojis toolbar icon, or press **Ctrl+Shift+E** / **⌘⇧E**
- Search or browse, stack emoji in the compose bar, then **Copy**

## Updating

When a new tag/release ships:

1. Download the new zip and unzip it (replace the old folder, or load a new one)
2. On `chrome://extensions`, click **Reload** on Remojis (or remove the old unpacked build and load the new folder)

## Publishing a release (maintainers)

```bash
git tag v0.1.0
git push origin v0.1.0
```

That triggers [`.github/workflows/release-extension.yml`](../.github/workflows/release-extension.yml), which builds the extension and attaches the zip to a GitHub Release.
