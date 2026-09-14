import { motion } from 'framer-motion'

export default function CategoryNav({ categories, activeId, onSelect }) {
  const items = [{ id: 'all', label: 'All' }, ...categories.map((c) => ({ id: c.id, label: c.label }))]

  return (
    <nav
      aria-label="Product categories"
      className="sticky top-16 z-30 border-b border-white/[0.06] bg-void-950/80 backdrop-blur-lg"
    >
      <div className="container-shell">
        <ul className="flex list-none gap-2 overflow-x-auto py-3 no-scrollbar">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-ink-500 hover:text-ink-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
