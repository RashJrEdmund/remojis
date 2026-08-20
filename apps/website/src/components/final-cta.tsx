import { Reveal } from './reveal'
import { INSTALL_HASH, RELEASES_URL } from '~/lib/links'

export function FinalCta() {
  return (
    <section id="get" className="relative scroll-mt-8 px-5 py-24 sm:px-8 lg:px-10">
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
            <p className="mt-5 max-w-xl text-lg text-[color:var(--ink-soft)]">
              Not on the Chrome Web Store yet (one-time publish fee still
              pending). Download the zip from GitHub, unpack it, turn on
              Developer mode, and load the folder unpacked.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="btn-primary"
                href={RELEASES_URL}
                rel="noreferrer"
                target="_blank"
              >
                Download from GitHub
              </a>
              <a className="btn-ghost" href={INSTALL_HASH}>
                How to install
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
