import { Reveal } from './reveal'

export function FinalCta() {
  return (
    <section id="get" className="relative px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--ink)]/10 bg-[color-mix(in_srgb,white_55%,transparent)] px-6 py-16 sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-16 text-[11rem] leading-none opacity-20 select-none sm:text-[14rem]"
            >
              🍋
            </div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[color:var(--citrus-hot)] uppercase">
              Ready
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-6xl">
              Stop hunting. Start stacking.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-[color:var(--ink-soft)]">
              Load the unpacked build today, or grab it from the Chrome Web Store
              when we ship the listing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="btn-primary"
                href="https://chromewebstore.google.com/"
                rel="noreferrer"
                target="_blank"
              >
                Chrome Web Store
              </a>
              <a className="btn-ghost" href="#flow">
                Tour the flow
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
