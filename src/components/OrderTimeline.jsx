import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { STATUS_SEQUENCE } from '../utils/orderHelpers'

export default function OrderTimeline({ status }) {
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 text-sm text-rose-400" role="status">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-400/10">
          <X size={14} />
        </span>
        Order cancelled
      </div>
    )
  }

  const currentIndex = STATUS_SEQUENCE.indexOf(status)

  return (
    <ol className="flex items-center" role="status" aria-label={`Order status: ${status}`}>
      {STATUS_SEQUENCE.map((step, i) => {
        const isComplete = i <= currentIndex
        const isLast = i === STATUS_SEQUENCE.length - 1
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <motion.span
                animate={{
                  backgroundColor: isComplete ? '#4C6FFF' : 'rgba(255,255,255,0.06)',
                  scale: i === currentIndex ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white"
              >
                {isComplete && <Check size={13} />}
              </motion.span>
              <span className={`whitespace-nowrap text-xs ${isComplete ? 'text-ink-100' : 'text-ink-700'}`}>
                {step}
              </span>
            </div>
            {!isLast && (
              <div className="mx-2 h-px flex-1 bg-white/10">
                <motion.div
                  className="h-full bg-signal-blue"
                  initial={{ width: 0 }}
                  animate={{ width: i < currentIndex ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
