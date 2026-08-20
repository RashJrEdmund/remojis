export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--ink)]/10 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">
            Remojis
          </p>
          <p className="mt-1 max-w-sm text-sm text-[color:var(--ink-soft)]/75">
            A Unicode emoji keyboard for Chrome. Preferences stay on your
            device. No accounts. No tracking circus.
          </p>
        </div>
        <p className="text-sm text-[color:var(--ink-soft)]/55">
          © {new Date().getFullYear()} Remojis
        </p>
      </div>
    </footer>
  )
}
