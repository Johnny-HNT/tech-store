import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Loader2, PackageX } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'
import QuantitySelector from '../components/QuantitySelector'
import CustomerForm, { validateCustomer } from '../components/CustomerForm'
import EmptyState from '../components/EmptyState'
import { getProductById, getCategoryById, formatPrice } from '../data/products'
import { buildOrder, calculateTotal } from '../utils/orderHelpers'
import { saveOrder } from '../utils/storage'

const STAGE = {
  FORM: 'form',
  PROCESSING: 'processing',
  SUCCESS: 'success',
}

export default function BuyProduct() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = getProductById(productId)

  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState(product?.variants?.[0]?.name || null)
  const [customer, setCustomer] = useState({ name: '', address: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [stage, setStage] = useState(STAGE.FORM)

  if (!product) {
    return (
      <div className="container-shell py-24">
        <EmptyState
          icon={PackageX}
          title="We couldn't find that product"
          message="It may have been removed, or the link may be incorrect."
          action={
            <Link to="/" className="btn-primary">
              Back to home
            </Link>
          }
        />
      </div>
    )
  }

  const total = calculateTotal(product.price, quantity)

  const handleConfirm = (e) => {
    e.preventDefault()
    const validationErrors = validateCustomer(customer)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStage(STAGE.PROCESSING)

    window.setTimeout(() => {
      const order = buildOrder({ product, quantity, variant, customer })
      saveOrder(order)
      setStage(STAGE.SUCCESS)
      window.setTimeout(() => navigate('/orders'), 1400)
    }, 1100)
  }

  return (
    <div className="container-shell py-10 sm:py-14">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-ink-100"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="aspect-square overflow-hidden rounded-3xl border border-white/[0.07] shadow-glow"
        >
          <ProductVisual product={product} size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-signal-cyan/80">
              {getCategoryById(product.category)?.label}
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-md text-ink-500">{product.longDescription}</p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold text-ink-100">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-ink-700">per unit</span>
          </div>

          {product.variants && product.variants.length > 1 && (
            <div>
              <p className="mb-2 text-sm font-medium text-ink-300">Color</p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => setVariant(v.name)}
                    aria-pressed={variant === v.name}
                    aria-label={v.name}
                    className={`h-9 w-9 rounded-full border-2 transition-transform ${
                      variant === v.name ? 'scale-110 border-signal-blue' : 'border-white/15'
                    }`}
                    style={{ backgroundColor: v.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-medium text-ink-300">Quantity</p>
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <h2 className="mb-4 text-sm font-medium text-ink-300">Pickup details</h2>
            <CustomerForm values={customer} onChange={setCustomer} errors={errors} />
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.07] pt-5">
            <div>
              <p className="text-sm text-ink-500">Total</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={total}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="font-display text-2xl font-semibold text-ink-100"
                >
                  {formatPrice(total)}
                </motion.p>
              </AnimatePresence>
            </div>
            <button type="button" onClick={handleConfirm} className="btn-primary" disabled={stage !== STAGE.FORM}>
              Confirm order
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {stage !== STAGE.FORM && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void-950/85 backdrop-blur-sm"
            role="status"
            aria-live="assertive"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel flex flex-col items-center gap-4 rounded-3xl px-10 py-12 text-center"
            >
              {stage === STAGE.PROCESSING ? (
                <>
                  <Loader2 size={40} className="animate-spin text-signal-blue" />
                  <p className="font-display text-lg font-semibold text-ink-100">
                    Placing your order…
                  </p>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <CheckCircle2 size={44} className="text-emerald-400" />
                  </motion.div>
                  <p className="font-display text-lg font-semibold text-ink-100">
                    Order confirmed
                  </p>
                  <p className="text-sm text-ink-500">Taking you to your orders…</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
