import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import type { CatalogEmoji } from '~/features/emoji/catalog'
import { applySkinTone } from '~/features/emoji/catalog'
import type { EmojiSize, Settings } from '~/lib/storage'
import { SIZE_CLASS, SIZE_ROW } from './grid-layout'

const COLUMNS = 8

interface EmojiGridProps {
  items: CatalogEmoji[]
  settings: Settings
  onPick: (emoji: CatalogEmoji) => void
  onPreview: (emoji: CatalogEmoji | null) => void
}

export function EmojiGrid({
  items,
  settings,
  onPick,
  onPreview,
}: EmojiGridProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const rowCount = Math.max(1, Math.ceil(items.length / COLUMNS))
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => SIZE_ROW[settings.emojiSize],
    overscan: 8,
  })

  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-zinc-500">
        No matches
      </div>
    )
  }

  return (
    <div
      ref={parentRef}
      className="emoji-scroll min-h-0 flex-1 overflow-y-auto px-1"
      role="grid"
      aria-label="Emoji"
      onMouseLeave={() => onPreview(null)}
    >
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const start = virtualRow.index * COLUMNS
          const rowItems = items.slice(start, start + COLUMNS)
          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 grid w-full grid-cols-8"
              role="row"
              style={{
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowItems.map((item) => (
                <EmojiCell
                  key={item.hexcode}
                  emoji={item}
                  size={settings.emojiSize}
                  glyph={applySkinTone(item, settings.skinTone)}
                  onPick={onPick}
                  onPreview={onPreview}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface EmojiCellProps {
  emoji: CatalogEmoji
  glyph: string
  size: EmojiSize
  onPick: (emoji: CatalogEmoji) => void
  onPreview: (emoji: CatalogEmoji | null) => void
}

function EmojiCell({
  emoji,
  glyph,
  size,
  onPick,
  onPreview,
}: EmojiCellProps) {
  return (
    <button
      className={`flex size-full items-center justify-center rounded-sm transition-transform duration-75 hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/70 ${SIZE_CLASS[size]}`}
      role="gridcell"
      title={`${emoji.label}. If paste shows a box, your OS may not support this emoji yet.`}
      type="button"
      onClick={() => onPick(emoji)}
      onFocus={() => onPreview(emoji)}
      onMouseEnter={() => onPreview(emoji)}
    >
      <span aria-hidden="true" className="select-none">
        {glyph}
      </span>
      <span className="sr-only">{emoji.label}</span>
    </button>
  )
}
