import type { SkinToneSetting } from '~/features/emoji/catalog'

const TONES: { tone: SkinToneSetting; glyph: string; label: string }[] = [
  { tone: 0, glyph: '👋', label: 'Default' },
  { tone: 1, glyph: '👋🏻', label: 'Light skin tone' },
  { tone: 2, glyph: '👋🏼', label: 'Medium-light skin tone' },
  { tone: 3, glyph: '👋🏽', label: 'Medium skin tone' },
  { tone: 4, glyph: '👋🏾', label: 'Medium-dark skin tone' },
  { tone: 5, glyph: '👋🏿', label: 'Dark skin tone' },
]

interface SkinToneControlProps {
  value: SkinToneSetting
  onChange: (tone: SkinToneSetting) => void
}

export function SkinToneControl({ value, onChange }: SkinToneControlProps) {
  return (
    <div
      aria-label="Skin tone"
      className="flex items-center gap-0.5"
      role="radiogroup"
    >
      {TONES.map((option) => {
        const selected = option.tone === value
        return (
          <button
            key={option.tone}
            aria-checked={selected}
            className={`flex size-7 items-center justify-center rounded-md text-sm ${
              selected
                ? 'bg-amber-100 ring-1 ring-amber-400 dark:bg-amber-950'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            role="radio"
            title={option.label}
            type="button"
            onClick={() => onChange(option.tone)}
          >
            <span aria-hidden="true">{option.glyph}</span>
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
