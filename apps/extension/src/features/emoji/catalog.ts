import { joinShortcodes } from 'emojibase'
import type { Emoji, GroupKey, ShortcodesDataset, SkinTone } from 'emojibase'
import rawEmojis from 'emojibase-data/en/data.json'
import messages from 'emojibase-data/en/messages.json'
import cldrShortcodes from 'emojibase-data/en/shortcodes/cldr.json'
import emojibaseShortcodes from 'emojibase-data/en/shortcodes/emojibase.json'
import githubShortcodes from 'emojibase-data/en/shortcodes/github.json'
import groupsMeta from 'emojibase-data/meta/groups.json'

const COMPONENT_GROUP = 2

export type SkinToneSetting = 0 | SkinTone

export interface CatalogEmoji {
  hexcode: string
  emoji: string
  label: string
  group?: number
  groupKey?: GroupKey
  searchText: string
  skins?: CatalogSkin[]
}

export interface CatalogSkin {
  emoji: string
  tone: SkinTone
}

export interface Category {
  id: 'recents' | GroupKey
  label: string
  icon: string
}

const CATEGORY_ICONS: Record<GroupKey, string> = {
  'smileys-emotion': '😀',
  'people-body': '👋',
  'animals-nature': '🌿',
  'food-drink': '🍔',
  'travel-places': '✈️',
  activities: '⚽',
  objects: '💡',
  symbols: '🔣',
  flags: '🏳️',
  component: '🧩',
}

function emoticonList(value: Emoji['emoticon']): string[] {
  if (!value) {
    return []
  }
  return Array.isArray(value) ? value : [value]
}

function buildSearchText(emoji: Emoji): string {
  const parts = [
    emoji.label,
    ...(emoji.tags ?? []),
    ...(emoji.shortcodes ?? []),
    ...emoticonList(emoji.emoticon),
    emoji.emoji,
  ]
  return parts.join(' ').toLowerCase()
}

function toCatalogEmoji(emoji: Emoji): CatalogEmoji {
  const groupKey =
    emoji.group === undefined
      ? undefined
      : (groupsMeta.groups[String(emoji.group) as keyof typeof groupsMeta.groups] as
          | GroupKey
          | undefined)

  const skins = emoji.skins
    ?.map((skin) => {
      if (typeof skin.tone !== 'number') {
        return undefined
      }
      return { emoji: skin.emoji, tone: skin.tone }
    })
    .filter((skin): skin is CatalogSkin => skin !== undefined)

  return {
    hexcode: emoji.hexcode,
    emoji: emoji.emoji,
    label: emoji.label,
    group: emoji.group,
    groupKey,
    searchText: buildSearchText(emoji),
    skins: skins?.length ? skins : undefined,
  }
}

const withShortcodes = joinShortcodes(rawEmojis as Emoji[], [
  githubShortcodes as ShortcodesDataset,
  emojibaseShortcodes as ShortcodesDataset,
  cldrShortcodes as ShortcodesDataset,
])

export const catalog: CatalogEmoji[] = withShortcodes
  .filter((emoji) => emoji.group !== undefined && emoji.group !== COMPONENT_GROUP)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map(toCatalogEmoji)

export const catalogByHex = new Map(
  catalog.map((emoji) => [emoji.hexcode, emoji]),
)

export const categories: Category[] = [
  { id: 'recents', label: 'Recents', icon: '🕒' },
  ...messages.groups
    .filter((group) => group.key !== 'component')
    .sort((a, b) => a.order - b.order)
    .map((group) => ({
      id: group.key,
      label: group.message,
      icon: CATEGORY_ICONS[group.key],
    })),
]

export function applySkinTone(
  emoji: CatalogEmoji,
  tone: SkinToneSetting,
): string {
  if (!tone || !emoji.skins?.length) {
    return emoji.emoji
  }
  return emoji.skins.find((skin) => skin.tone === tone)?.emoji ?? emoji.emoji
}

export function searchCatalog(query: string): CatalogEmoji[] {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  if (tokens.length === 0) {
    return catalog
  }

  return catalog.filter((emoji) =>
    tokens.every((token) => emoji.searchText.includes(token)),
  )
}

export function emojisForCategory(categoryId: Category['id']): CatalogEmoji[] {
  if (categoryId === 'recents') {
    return []
  }
  return catalog.filter((emoji) => emoji.groupKey === categoryId)
}

export function resolveRecents(hexcodes: string[]): CatalogEmoji[] {
  return hexcodes
    .map((hex) => catalogByHex.get(hex))
    .filter((emoji): emoji is CatalogEmoji => emoji !== undefined)
}
