import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageSearch, ArrowUpRight } from 'lucide-react'
import OrderCard from '../components/OrderCard'
import EmptyState from '../components/EmptyState'
import { getOrders } from '../utils/storage'

export default function Orders() {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  if (orders === null) {
    return <div className="container-shell py-24" />
  }

  return (
    <div className="container-shell py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col gap-2 sm:mb-10"
      >
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">My orders</h1>
        <p className="text-ink-500">Every order placed from this device, saved locally.</p>
      </motion.div>

      {orders.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No orders yet"
          message="Once you place an order, it will show up here with live status updates."
          action={
            <Link to="/" className="btn-primary">
              Continue shopping
              <ArrowUpRight size={16} />
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
