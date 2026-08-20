import { Reveal } from './reveal'

const STEPS = [
  {
    index: '01',
    title: 'Open mid-thought',
    copy: 'Hit the shortcut or toolbar icon. Remojis appears without yanking you out of the page.',
  },
  {
    index: '02',
    title: 'Stack what you mean',
    copy: 'Click once to add, again to keep going. Build a little constellation in the compose bar.',
  },
  {
    index: '03',
    title: 'Copy lands where you left off',
    copy: 'One tap copies the whole string and inserts into the last field you focused — clipboard as backup.',
  },
] as const

export function HowItWorks() {
  return (
    <section id="flow" className="relative px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-[color:var(--lagoon)] uppercase">
            Flow
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
            Three beats from blank caret to pasted vibe.
          </h2>
        </Reveal>

        <ol className="mt-14 space-y-0 border-t border-[color:var(--ink)]/10">
          {STEPS.map((step, i) => (
            <Reveal key={step.index} delayMs={i * 90}>
              <li className="grid gap-4 border-b border-[color:var(--ink)]/10 py-8 md:grid-cols-[5rem_1fr_1.2fr] md:items-baseline md:gap-8">
                <span className="font-display text-2xl font-bold text-[color:var(--citrus-hot)]">
                  {step.index}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-[color:var(--ink)]">
                  {step.title}
                </h3>
                <p className="max-w-md text-[color:var(--ink-soft)] leading-relaxed">
                  {step.copy}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
