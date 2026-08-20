import type { SkinToneSetting } from '~/features/emoji/catalog'

export type EmojiSize = 's' | 'm' | 'l'

export interface Settings {
  emojiSize: EmojiSize
  recentsCount: number
  skinTone: SkinToneSetting
  recents: string[]
}

export const DEFAULT_SETTINGS: Settings = {
  emojiSize: 'm',
  recentsCount: 24,
  skinTone: 0,
  recents: [],
}

const STORAGE_KEY = 'remojis.settings'

export async function loadSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  const stored = result[STORAGE_KEY] as Partial<Settings> | undefined
  if (!stored) {
    return { ...DEFAULT_SETTINGS }
  }
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    recents: Array.isArray(stored.recents) ? stored.recents : [],
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: settings })
}

export function recordRecent(settings: Settings, hexcode: string): Settings {
  const recents = [
    hexcode,
    ...settings.recents.filter((item) => item !== hexcode),
  ].slice(0, settings.recentsCount)
  return { ...settings, recents }
}
