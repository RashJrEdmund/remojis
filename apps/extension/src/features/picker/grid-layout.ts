import type { EmojiSize } from '~/lib/storage'

export const SIZE_CLASS: Record<EmojiSize, string> = {
  s: 'text-[22px] leading-none',
  m: 'text-[28px] leading-none',
  l: 'text-[34px] leading-none',
}

export const SIZE_ROW: Record<EmojiSize, number> = {
  s: 32,
  m: 38,
  l: 44,
}
