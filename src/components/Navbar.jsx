import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/#products', label: 'Products', end: false },
  { to: '/orders', label: 'My Orders', end: false },
]

const MASTER_LINK = { to: '/master', label: 'Master', end: false }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-void-950/85 backdrop-blur-lg border-b border-white/[0.06]' : 'bg-transparent'
      }`}
    >
      <div className="container-shell flex h-16 items-center justify-between">
        <NavLink
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-100 transition-colors hover:border-signal-blue/40"
          aria-label="Go to home"
        >
          <span
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-signal-blue to-signal-violet"
            aria-hidden="true"
          />
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-ink-500 hover:text-ink-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to={MASTER_LINK.to}
            className={({ isActive }) =>
              `hidden items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors md:inline-flex ${
                isActive
                  ? 'border-signal-blue/50 bg-signal-blue/15 text-white'
                  : 'border-white/10 text-ink-500 hover:border-signal-blue/40 hover:text-ink-100'
              }`
            }
          >
            <LayoutDashboard size={15} />
            {MASTER_LINK.label}
          </NavLink>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-void-950/95 md:hidden"
            aria-label="Primary"
          >
            <div className="container-shell flex flex-col py-3">
              {LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium ${
                      isActive ? 'text-white' : 'text-ink-500'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to={MASTER_LINK.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium ${
                    isActive ? 'text-white' : 'text-ink-500'
                  }`
                }
              >
                <LayoutDashboard size={16} />
                {MASTER_LINK.label}
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
