import { formatPrice } from '../data/products'

export const ORDER_STATUSES = ['Pending', 'Processing', 'Completed', 'Cancelled']

// Ordered progression used to render the timeline. Cancelled is handled
// as a separate terminal branch, not a step in this sequence.
export const STATUS_SEQUENCE = ['Pending', 'Processing', 'Completed']

export function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ORD-${stamp}-${rand}`
}

export function calculateTotal(unitPrice, quantity) {
  const safeQty = Math.max(1, Number(quantity) || 1)
  return Number((unitPrice * safeQty).toFixed(2))
}

export function buildOrder({ product, quantity, variant, customer }) {
  const total = calculateTotal(product.price, quantity)
  return {
    id: generateOrderId(),
    productId: product.id,
    productName: product.name,
    productImage: product.image || null,
    productIcon: product.icon,
    productAccent: product.accent,
    category: product.category,
    unitPrice: product.price,
    quantity: Math.max(1, Number(quantity) || 1),
    variant: variant || null,
    total,
    customerName: customer.name,
    deliveryAddress: customer.address,
    phoneNumber: customer.phone,
    createdAt: new Date().toISOString(),
    status: 'Pending',
  }
}

/** Dynamically derives dashboard summary statistics from raw orders. */
export function computeStats(orders) {
  const totalOrders = orders.length
  const totalItemsSold = orders.reduce((sum, o) => sum + (o.quantity || 0), 0)
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0)
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length
  const completedOrders = orders.filter((o) => o.status === 'Completed').length

  return {
    totalOrders,
    totalItemsSold,
    totalRevenue,
    totalRevenueDisplay: formatPrice(totalRevenue),
    pendingOrders,
    completedOrders,
  }
}

export function filterOrders(orders, { query, status }) {
  let result = orders

  if (status && status !== 'All') {
    result = result.filter((o) => o.status === status)
  }

  if (query && query.trim()) {
    const q = query.trim().toLowerCase()
    result = result.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q)
    )
  }

  return result
}

export function sortOrders(orders, sortBy) {
  const list = [...orders]
  switch (sortBy) {
    case 'oldest':
      return list.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    case 'highest':
      return list.sort((a, b) => b.total - a.total)
    case 'lowest':
      return list.sort((a, b) => a.total - b.total)
    case 'newest':
    default:
      return list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }
}
