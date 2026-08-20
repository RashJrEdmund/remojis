import { Reveal } from './reveal'
import { INSTALL_HASH, RELEASES_URL } from '~/lib/links'

const STEPS = [
  {
    title: 'Download the zip',
    body: (
      <>
        Grab the latest build from{' '}
        <a
          className="font-semibold text-(--ink) underline decoration-(--citrus) underline-offset-2"
          href={RELEASES_URL}
          rel="noreferrer"
          target="_blank"
        >
          GitHub Releases
        </a>
        . Unzip it somewhere you won&apos;t delete on a whim — you need the
        folder that contains <code className="text-sm">manifest.json</code>.
      </>
    ),
  },
  {
    title: 'Open Chrome extensions',
    body: (
      <>
        Visit{' '}
        <code className="rounded bg-(--ink)/5 px-1.5 py-0.5 text-sm">
          chrome://extensions
        </code>{' '}
        and turn on <strong>Developer mode</strong> (toggle in the top right).
      </>
    ),
  },
  {
    title: 'Load unpacked',
    body: (
      <>
        Click <strong>Load unpacked</strong>, then select the unzipped folder.
        Pin Remojis from the puzzle-piece menu if you want it on the toolbar.
      </>
    ),
  },
  {
    title: 'Stack away',
    body: (
      <>
        Use the toolbar icon or <strong>Ctrl/⌘ + Shift + E</strong>. Search,
        click to stack, hit Copy. Reload the extension on{' '}
        <code className="text-sm">chrome://extensions</code> when you download
        a newer release.
      </>
    ),
  },
] as const

export function InstallGuide() {
  return (
    <section
      id="install"
      className="relative scroll-mt-8 px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-(--lagoon) uppercase">
            Install
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-extrabold tracking-[-0.03em] text-(--ink) sm:text-5xl">
            Manual install for now
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-(--ink-soft)">
            Publishing on the Chrome Web Store needs a one-time developer fee I
            haven&apos;t paid yet. Until then, download the built extension from
            GitHub, unpack it, enable Developer mode, and load it unpacked —
            same flow Chrome uses for local extension development.
          </p>
        </Reveal>

        <ol className="mt-12 space-y-0 border-t border-(--ink)/10">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 70}>
              <li className="grid gap-3 border-b border-(--ink)/10 py-7 md:grid-cols-[4rem_1fr] md:gap-8">
                <span className="font-display text-2xl font-bold text-(--citrus-hot)">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-(--ink)">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-(--ink-soft)">
                    {step.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delayMs={200}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              className="btn-primary"
              href={RELEASES_URL}
              rel="noreferrer"
              target="_blank"
            >
              Download from GitHub
            </a>
            <a className="btn-ghost" href={INSTALL_HASH}>
              Jump to steps
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
