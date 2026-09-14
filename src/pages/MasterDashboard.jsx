import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Boxes,
  CheckCircle2,
  Clock,
  Package,
  RefreshCw,
  Search,
  Wallet,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import ProductVisual from '../components/ProductVisual'
import EmptyState from '../components/EmptyState'
import { formatPrice } from '../data/products'
import { formatDateTime } from '../utils/formatters'
import { getOrders, updateOrder } from '../utils/storage'
import {
  ORDER_STATUSES,
  computeStats,
  filterOrders,
  sortOrders,
} from '../utils/orderHelpers'

const STATUS_FILTERS = ['All', ...ORDER_STATUSES]
const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
  { id: 'highest', label: 'Highest total' },
  { id: 'lowest', label: 'Lowest total' },
]

export default function MasterDashboard() {
  const [orders, setOrders] = useState(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [lastFetchedAt, setLastFetchedAt] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Single source of truth: always re-read from storage instead of
  // patching local state, so a click here or an order placed in another
  // tab is reflected as soon as this fires.
  const fetchOrders = useCallback(() => {
    setIsRefreshing(true)
    setOrders(getOrders())
    setLastFetchedAt(new Date())
    // Keep the spinner visible just long enough to read as a real refresh.
    window.setTimeout(() => setIsRefreshing(false), 300)
  }, [])

  useEffect(() => {
    fetchOrders()

    // Orders placed from another tab/window write to localStorage —
    // this event fires here automatically so the dashboard catches it.
    const onStorage = (e) => {
      if (!e.key || e.key === 'novatech_orders_v1') fetchOrders()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [fetchOrders])

  const stats = useMemo(() => computeStats(orders || []), [orders])

  const visibleOrders = useMemo(() => {
    if (!orders) return []
    return sortOrders(filterOrders(orders, { query, status: statusFilter }), sortBy)
  }, [orders, query, statusFilter, sortBy])

  const handleStatusChange = (orderId, status) => {
    updateOrder(orderId, { status })
    fetchOrders()
  }

  if (orders === null) {
    return <div className="container-shell py-24" />
  }

  return (
    <div className="container-shell py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-wrap items-start justify-between gap-4"
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Order dashboard</h1>
          <p className="text-ink-500">Search, filter, and manage every order in one place.</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <button
            type="button"
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-ink-100 transition-colors hover:border-signal-blue/40 disabled:opacity-60"
            disabled={isRefreshing}
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          {lastFetchedAt && (
            <span className="text-xs text-ink-700">
              Updated {formatDateTime(lastFetchedAt.toISOString())}
            </span>
          )}
        </div>
      </motion.div>

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total orders" value={stats.totalOrders} icon={Package} accent="#4C6FFF" />
        <StatCard label="Items sold" value={stats.totalItemsSold} icon={Boxes} accent="#9D5CFF" />
        <StatCard
          label="Revenue"
          value={stats.totalRevenue}
          prefix="$"
          decimals={2}
          icon={Wallet}
          accent="#3EE6D8"
        />
        <StatCard label="Pending" value={stats.pendingOrders} icon={Clock} accent="#F5A524" />
        <StatCard label="Completed" value={stats.completedOrders} icon={CheckCircle2} accent="#34D399" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-700" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order, product, or customer"
            aria-label="Search orders"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-ink-100 placeholder:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-violet"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                aria-pressed={statusFilter === s}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-signal-blue/20 text-blue-200 border border-signal-blue/40'
                    : 'border border-white/10 text-ink-500 hover:text-ink-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="sr-only" htmlFor="sort-orders">
            Sort orders
          </label>
          <select
            id="sort-orders"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border border-white/10 bg-void-800 px-3.5 py-2 text-xs font-medium text-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-violet"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visibleOrders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No matching orders"
          message="Try a different search term or clear the active filters."
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-white/[0.07] lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-ink-700">
                <tr>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Qty</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {visibleOrders.map((order) => (
                    <motion.tr
                      layout
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-white/[0.05]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                            <ProductVisual
                              product={{
                                icon: order.productIcon,
                                accent: order.productAccent,
                                name: order.productName,
                                image: order.productImage,
                              }}
                              size="sm"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-ink-100">{order.productName}</p>
                            <p className="text-xs text-ink-700">{order.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-ink-100">{order.customerName}</p>
                        <p className="text-xs text-ink-700">{order.phoneNumber}</p>
                      </td>
                      <td className="px-5 py-4 text-ink-300">{order.quantity}</td>
                      <td className="px-5 py-4 font-medium text-ink-100">{formatPrice(order.total)}</td>
                      <td className="px-5 py-4 text-ink-500">{formatDateTime(order.createdAt)}</td>
                      <td className="px-5 py-4">
                        <StatusSelect order={order} onChange={handleStatusChange} />
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet cards */}
          <div className="flex flex-col gap-4 lg:hidden">
            <AnimatePresence>
              {visibleOrders.map((order) => (
                <motion.div
                  layout
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel rounded-2xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                      <ProductVisual
                        product={{
                          icon: order.productIcon,
                          accent: order.productAccent,
                          name: order.productName,
                          image: order.productImage,
                        }}
                        size="sm"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-ink-100">{order.productName}</p>
                          <p className="text-xs text-ink-700">{order.id}</p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="mt-2 text-sm text-ink-300">{order.customerName}</p>
                      <p className="text-xs text-ink-700">{order.phoneNumber}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-500">
                        <span>Qty {order.quantity}</span>
                        <span className="font-medium text-ink-100">{formatPrice(order.total)}</span>
                        <span>{formatDateTime(order.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <StatusSelect order={order} onChange={handleStatusChange} fullWidth />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  )
}

function StatusSelect({ order, onChange, fullWidth }) {
  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Update status for order {order.id}</span>
      <select
        value={order.status}
        onChange={(e) => onChange(order.id, e.target.value)}
        className={`rounded-full border border-white/10 bg-void-800 px-3 py-1.5 text-xs font-medium text-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-violet ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        {ORDER_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </label>
  )
}
