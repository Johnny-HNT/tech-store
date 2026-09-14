import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import FeaturedProduct from './FeaturedProduct'

/**
 * Renders one category's products. Hero categories (earbuds, headphones)
 * get a featured showcase plus a roomy grid; secondary categories get a
 * tighter horizontally-scrollable strip — so sections share one design
 * system without looking identical.
 */
const ProductSection = forwardRef(function ProductSection(
  { category, products },
  ref
) {
  if (!products.length) {
    return null
  }

  const isFeatured = category.featured

  return (
    <section
      ref={ref}
      id={`category-${category.id}`}
      className="scroll-mt-28 py-14 sm:py-20"
      aria-labelledby={`heading-${category.id}`}
    >
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col gap-2 sm:mb-10"
        >
          <h2 id={`heading-${category.id}`} className="text-2xl font-semibold sm:text-3xl">
            {category.label}
          </h2>
          <p className="text-ink-500">{category.tagline}</p>
        </motion.div>

        {isFeatured ? (
          <div className="flex flex-col gap-6">
            <FeaturedProduct product={products[0]} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.slice(1).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0">
            {products.map((product) => (
              <div key={product.id} className="w-64 flex-shrink-0 sm:w-auto">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

export default ProductSection
