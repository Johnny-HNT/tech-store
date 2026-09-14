const STYLES = {
  Pending: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
  Processing: 'bg-signal-blue/10 text-blue-300 border-signal-blue/30',
  Completed: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
  Cancelled: 'bg-rose-400/10 text-rose-300 border-rose-400/30',
}

export default function StatusBadge({ status, className = '' }) {
  const style = STYLES[status] || STYLES.Pending
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${style} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
