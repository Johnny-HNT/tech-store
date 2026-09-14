import { motion } from 'framer-motion'

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel flex flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center"
    >
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.05] text-signal-blue">
          <Icon size={26} />
        </span>
      )}
      <div className="max-w-sm">
        <h3 className="font-display text-lg font-semibold text-ink-100">{title}</h3>
        {message && <p className="mt-1.5 text-sm text-ink-500">{message}</p>}
      </div>
      {action}
    </motion.div>
  )
}
