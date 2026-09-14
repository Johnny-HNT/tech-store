// Storage utility — the ONLY module that talks to localStorage.
// Swapping this for a real backend (Firebase/Supabase/custom API) later
// means rewriting these four functions; nothing else in the app changes.

const ORDERS_KEY = 'novatech_orders_v1'

const isBrowser = typeof window !== 'undefined' && !!window.localStorage

/** Safely parse the raw orders blob, discarding anything malformed. */
function readRaw() {
  if (!isBrowser) return []
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Filter out entries that don't look like valid orders instead of
    // letting one corrupt record take down the whole list.
    return parsed.filter(
      (order) =>
        order &&
        typeof order === 'object' &&
        typeof order.id === 'string' &&
        typeof order.productId === 'string'
    )
  } catch (err) {
    console.error('Orders storage is corrupted, resetting.', err)
    return []
  }
}

function writeRaw(orders) {
  if (!isBrowser) return false
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    return true
  } catch (err) {
    console.error('Failed to persist orders.', err)
    return false
  }
}

/** Returns all stored orders, newest first. */
export function getOrders() {
  return readRaw().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getOrderById(orderId) {
  return readRaw().find((order) => order.id === orderId) || null
}

/** Appends a new order and persists it. Returns the saved order. */
export function saveOrder(order) {
  const orders = readRaw()
  orders.push(order)
  writeRaw(orders)
  return order
}

/** Patches an existing order by id. Returns the updated order, or null. */
export function updateOrder(orderId, patch) {
  const orders = readRaw()
  const index = orders.findIndex((order) => order.id === orderId)
  if (index === -1) return null
  orders[index] = { ...orders[index], ...patch }
  writeRaw(orders)
  return orders[index]
}

export function clearOrders() {
  writeRaw([])
}
