export function formatDateTime(isoString) {
  if (!isoString) return 'Unknown date'
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return 'Unknown date'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function truncate(text, max = 90) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text
}
