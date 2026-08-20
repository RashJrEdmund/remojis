export function SiteFooter() {
  return (
    <footer className="border-t border-(--ink)/10 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">
            Remojis
          </p>
          <p className="mt-1 max-w-sm text-sm text-(--ink-soft)/75">
            A Unicode emoji keyboard for Chrome. Preferences stay on your
            device. No accounts. No tracking circus.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            className="text-sm font-semibold text-(--ink) no-underline hover:underline"
            href="https://github.com/RashJrEdmund/remojis/releases/latest"
            rel="noreferrer"
            target="_blank"
          >
            Download releases
          </a>
          <p className="text-sm text-(--ink-soft)/55">
            © {new Date().getFullYear()} Remojis
          </p>
        </div>
      </div>
    </footer>
  )
}
