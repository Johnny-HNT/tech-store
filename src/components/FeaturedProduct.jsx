import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { formatPrice } from '../data/products'

/** Large showcase treatment used for the first item in a hero category. */
export default function FeaturedProduct({ product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="group relative grid overflow-hidden rounded-3xl border border-white/[0.07] bg-void-800/50 shadow-glow md:grid-cols-2"
    >
      <div className="relative aspect-[4/3] md:aspect-auto">
        <ProductVisual product={product} size="lg" />
      </div>

      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
        <span className="text-xs font-medium uppercase tracking-wide text-signal-cyan/80">
          Featured
        </span>
        <h3 className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl">
          {product.name}
        </h3>
        <p className="max-w-sm text-ink-500">{product.description}</p>

        {product.variants && product.variants.length > 1 && (
          <div className="flex items-center gap-2 pt-1">
            {product.variants.map((v) => (
              <span
                key={v.name}
                title={v.name}
                className="h-5 w-5 rounded-full border border-white/20"
                style={{ backgroundColor: v.hex }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-5 pt-2">
          <span className="font-display text-2xl font-semibold text-ink-100">
            {formatPrice(product.price)}
          </span>
          <Link to={`/buy/${product.id}`} className="btn-primary">
            Buy now
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
