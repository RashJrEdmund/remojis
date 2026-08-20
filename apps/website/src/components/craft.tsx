import { Reveal } from './reveal'

const POINTS = [
  {
    title: 'Search that speaks human',
    copy: 'Names, keywords, shortcodes — type “fire” or “:rocket:” and land on the glyph you meant.',
    glyph: '🔍',
  },
  {
    title: 'Native, not a costume',
    copy: 'Remojis ships Unicode code points and renders with your OS font. Paste matches what your friends already see.',
    glyph: '🖥️',
  },
  {
    title: 'Works when the tab does',
    copy: 'Emoji data is bundled. No CDN hunt, no login wall, no “please wait while we sync joy.”',
    glyph: '📦',
  },
  {
    title: 'Skin tones & recents',
    copy: 'Set a default tone, keep a short history of what you actually use, size the grid to taste.',
    glyph: '👋',
  },
] as const

export function Craft() {
  return (
    <section className="relative px-5 py-8 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[color:var(--ink)]/8 bg-[linear-gradient(145deg,#14110f_0%,#2a241f_48%,#1f3d38_100%)] px-6 py-14 text-[#fff8ef] sm:px-10 sm:py-16">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-[#ffb020] uppercase">
            Craft
          </p>
          <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight font-extrabold tracking-[-0.03em] sm:text-5xl">
            Built like a tool, not a theme park.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delayMs={80 + i * 70}>
              <article>
                <span className="text-3xl" aria-hidden="true">
                  {point.glyph}
                </span>
                <h3 className="font-display mt-4 text-xl font-bold tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-[#fff8ef]/72">
                  {point.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
