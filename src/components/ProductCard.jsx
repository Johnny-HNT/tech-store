import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { formatPrice } from '../data/products'

export default function ProductCard({ product, size = 'md' }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const isFeatured = size === 'lg'

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-void-800/50 transition-shadow duration-300 hover:shadow-glow"
    >
      <Link
        to={`/buy/${product.id}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${product.name}`}
      />

      <div
        className={`relative overflow-hidden ${isFeatured ? 'aspect-[4/3]' : 'aspect-square'}`}
      >
        <motion.div className="h-full w-full" whileHover={{ scale: 1.06 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <ProductVisual product={product} size={isFeatured ? 'lg' : 'md'} />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void-900/70 via-transparent to-transparent" />
      </div>

      <div className="relative flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-display font-semibold text-ink-100 ${isFeatured ? 'text-xl' : 'text-base'}`}>
            {product.name}
          </h3>
          <span className="whitespace-nowrap font-display text-lg font-semibold text-ink-100">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-500">{product.description}</p>

        <div className="mt-auto pt-3">
          <Link
            to={`/buy/${product.id}`}
            className="btn-secondary relative z-20 w-full text-sm group-hover:border-signal-blue/40"
          >
            Buy now
            <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
