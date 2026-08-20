import { ExtensionMock } from './extension-mock'
import { EmojiField } from './emoji-field'

export function Hero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <EmojiField />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col px-5 pt-6 pb-10 sm:px-8 lg:px-10">
        <nav className="animate-rise flex items-center justify-between">
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-tight text-(--ink) no-underline"
          >
            Remojis
          </a>
          <a href="#install" className="btn-ghost px-3! py-2! text-sm">
            Get extension
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-0">
          <div className="max-w-xl">
            <h1 className="animate-rise font-display text-[clamp(3.4rem,11vw,6.4rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-(--ink)">
              Remojis
            </h1>
            <p
              className="animate-rise mt-5 max-w-md text-lg leading-relaxed text-(--ink-soft) sm:text-xl"
              style={{ animationDelay: '120ms' }}
            >
              Search, stack, and drop Unicode emoji into whatever you&apos;re
              typing — without wrestling the OS picker.
            </p>
            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '220ms' }}
            >
              <a href="#install" className="btn-primary">
                Get the extension
              </a>
              <a href="#flow" className="btn-ghost">
                See how it works
              </a>
            </div>
            <p
              className="animate-rise mt-5 text-sm text-(--ink-soft)/70"
              style={{ animationDelay: '320ms' }}
            >
              Ctrl/⌘ + Shift + E · offline · your OS glyphs
            </p>
          </div>

          <div
            className="animate-rise relative lg:justify-self-end"
            style={{ animationDelay: '180ms' }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-4xl bg-[radial-gradient(circle_at_30%_20%,#ffb02055,transparent_55%),radial-gradient(circle_at_80%_70%,#1f8a7a33,transparent_50%)]"
            />
            <ExtensionMock />
          </div>
        </div>
      </div>
    </section>
  )
}
