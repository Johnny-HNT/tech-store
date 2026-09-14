import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'

function AnimatedNumber({ value, prefix = '', decimals = 0 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }
    const duration = 900
    const start = performance.now()
    const from = 0
    let frame

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + (value - from) * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, prefersReducedMotion])

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
    </span>
  )
}

export default function StatCard({ label, value, prefix = '', decimals = 0, icon: Icon, accent = '#4C6FFF' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="glass-panel relative overflow-hidden rounded-2xl p-5"
    >
      <div
        className="absolute -right-4 -top-4 h-20 w-20 rounded-full blur-2xl"
        style={{ background: accent, opacity: 0.18 }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-500">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-ink-100">
            <AnimatedNumber value={value} prefix={prefix} decimals={decimals} />
          </p>
        </div>
        {Icon && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${accent}1A`, color: accent }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
