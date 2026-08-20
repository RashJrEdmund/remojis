import type { RefObject } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  inputRef: RefObject<HTMLInputElement | null>
}

export function SearchBar({ value, onChange, inputRef }: SearchBarProps) {
  return (
    <label className="block border-b border-zinc-200 p-2 dark:border-zinc-700">
      <span className="sr-only">Search emoji</span>
      <input
        ref={inputRef}
        autoFocus
        className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-amber-400 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        placeholder="Search emoji…"
        spellCheck={false}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
