/** Canonical links for downloads and install docs. */

const DEFAULT_RELEASES_URL =
  'https://github.com/RashJrEdmund/remojis/releases/latest'

export const RELEASES_URL =
  import.meta.env.VITE_RELEASES_URL?.trim() || DEFAULT_RELEASES_URL

export const INSTALL_HASH = '#install' as const
