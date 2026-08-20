import type { Category } from '~/features/emoji/catalog'

interface CategoryRailProps {
  categories: Category[]
  activeId: Category['id']
  onSelect: (id: Category['id']) => void
}

export function CategoryRail({
  categories,
  activeId,
  onSelect,
}: CategoryRailProps) {
  return (
    <nav
      aria-label="Emoji categories"
      className="flex gap-0.5 overflow-x-auto border-b border-zinc-200 px-1 py-1 dark:border-zinc-700"
    >
      {categories.map((category) => {
        const isActive = category.id === activeId
        return (
          <button
            key={category.id}
            aria-current={isActive ? 'page' : undefined}
            className={`flex size-8 shrink-0 items-center justify-center rounded-md text-base ${
              isActive
                ? 'bg-amber-100 ring-1 ring-amber-400 dark:bg-amber-950 dark:ring-amber-500'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={category.label}
            type="button"
            onClick={() => onSelect(category.id)}
          >
            <span aria-hidden="true">{category.icon}</span>
            <span className="sr-only">{category.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
