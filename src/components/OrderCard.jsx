import { motion } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'
import ProductVisual from './ProductVisual'
import StatusBadge from './StatusBadge'
import OrderTimeline from './OrderTimeline'
import { formatPrice } from '../data/products'
import { formatDateTime } from '../utils/formatters'

export default function OrderCard({ order }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
          <ProductVisual
            product={{ icon: order.productIcon, accent: order.productAccent, name: order.productName, image: order.productImage }}
            size="sm"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-xs text-ink-700">{order.id}</p>
              <h3 className="font-display text-lg font-semibold text-ink-100">{order.productName}</h3>
              <p className="text-sm text-ink-500">{formatDateTime(order.createdAt)}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-500">
            <span>Qty {order.quantity}</span>
            <span>{formatPrice(order.unitPrice)} each</span>
            <span className="font-semibold text-ink-100">{formatPrice(order.total)} total</span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-700">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} /> {order.deliveryAddress}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} /> {order.phoneNumber}
            </span>
          </div>

          <div className="pt-2">
            <OrderTimeline status={order.status} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
