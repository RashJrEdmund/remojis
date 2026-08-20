import { useEffect, useState } from 'react'

const DEMO_GLYPHS = ['😉', '🔥', '✨', '🚀'] as const

export function ExtensionMock() {
  const [stack, setStack] = useState('')
  const [active, setActive] = useState(0)

  useEffect(() => {
    let step = 0
    const id = window.setInterval(() => {
      step = (step + 1) % (DEMO_GLYPHS.length + 2)
      if (step === 0) {
        setStack('')
        setActive(0)
        return
      }
      if (step > DEMO_GLYPHS.length) {
        return
      }
      setStack(DEMO_GLYPHS.slice(0, step).join(''))
      setActive(step - 1)
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="popup-frame animate-float mx-auto w-full max-w-[22rem] p-3 sm:max-w-[24rem]">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="font-display text-sm font-bold tracking-tight">Remojis</p>
        <p className="text-[11px] text-[color:var(--ink-soft)]/60">offline · unicode</p>
      </div>
      <div className="mb-2 rounded-lg border border-[color:var(--ink)]/10 bg-white/80 px-3 py-2 text-sm text-[color:var(--ink-soft)]/50">
        Search emoji…
      </div>
      <div className="mb-3 grid grid-cols-8 gap-0.5 px-0.5">
        {['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '🙂', '🤗', '🤩', '🤔', '🫡', '🤐', '🤨', '😐'].map(
          (glyph, index) => (
            <span
              key={`${glyph}-${index}`}
              className={`flex aspect-square items-center justify-center rounded-sm text-xl transition-transform ${
                active === index % DEMO_GLYPHS.length &&
                DEMO_GLYPHS[active] === glyph
                  ? 'scale-125 bg-[color:var(--citrus)]/35'
                  : ''
              }`}
            >
              {glyph}
            </span>
          ),
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex min-h-10 min-w-0 flex-1 items-center rounded-lg border border-[color:var(--ink)]/10 bg-[#fff8ef] px-3 text-xl">
          {stack || <span className="text-sm text-[color:var(--ink-soft)]/40">stack here</span>}
        </div>
        <span className="rounded-lg bg-[color:var(--citrus)] px-3 py-2 text-xs font-bold tracking-wide text-[color:var(--ink)] uppercase">
          Copy
        </span>
      </div>
    </div>
  )
}
