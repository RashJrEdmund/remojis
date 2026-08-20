const FIELD = [
  '😀', '😎', '🔥', '✨', '🎯', '🚀', '💜', '🌊',
  '🍕', '🦊', '🌙', '⚡', '🎨', '🦋', '🍀', '🍩',
  '🫶', '🥹', '🥳', '🫡', '🧿', '🌈', '🎧', '🪐',
  '🍋', '🌶️', '🫶', '🫠', '😤', '🤖', '📚', '🧃',
  '🛸', '🧊', '🎸', '🌸', '🧠', '🪄', '🐈', '🚲',
  '🏁', '💎', '🌻', '🎭', '🧩', '🛰️', '🥑', '💥',
]

export function EmojiField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="animate-drift absolute inset-[-8%] grid grid-cols-8 gap-y-8 gap-x-2 opacity-[0.22] sm:grid-cols-10 sm:gap-y-10 md:grid-cols-12">
        {Array.from({ length: 96 }, (_, index) => {
          const glyph = FIELD[index % FIELD.length]
          const delay = (index % 9) * 0.35
          return (
            <span
              key={index}
              className="animate-float justify-self-center text-3xl sm:text-4xl md:text-5xl"
              style={{ animationDelay: `${delay}s` }}
            >
              {glyph}
            </span>
          )
        })}
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#fff8ef]/55 to-[#fff8ef]" />
    </div>
  )
}
