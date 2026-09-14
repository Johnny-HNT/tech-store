import { Minus, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuantitySelector({ quantity, onChange }) {
  const decrease = () => onChange(Math.max(1, quantity - 1))
  const increase = () => onChange(quantity + 1)

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
      role="group"
      aria-label="Select quantity"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-white/[0.08] hover:text-white disabled:opacity-30 disabled:pointer-events-none"
      >
        <Minus size={16} />
      </button>
      <div className="relative flex h-10 w-12 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={quantity}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute font-display text-lg font-semibold text-ink-100"
            aria-live="polite"
          >
            {quantity}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={increase}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
