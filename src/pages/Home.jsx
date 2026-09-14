import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CategoryNav from '../components/CategoryNav'
import ProductSection from '../components/ProductSection'
import { CATEGORIES, PRODUCTS, getProductsByCategory } from '../data/products'

export default function Home() {
  const [activeId, setActiveId] = useState('all')
  const sectionRefs = useRef({})
  const productsAnchorRef = useRef(null)

  const grouped = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        category,
        products: getProductsByCategory(category.id),
      })),
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('category-', '')
            setActiveId(id)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach((node) => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const handleSelect = (id) => {
    setActiveId(id)
    if (id === 'all') {
      productsAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    document.getElementById(`category-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <Hero onExplore={() => handleSelect('all')} />

      <div id="products" ref={productsAnchorRef} />
      <CategoryNav categories={CATEGORIES} activeId={activeId} onSelect={handleSelect} />

      <div>
        {grouped.map(({ category, products }) => (
          <ProductSection
            key={category.id}
            category={category}
            products={products}
            ref={(node) => {
              sectionRefs.current[category.id] = node
            }}
          />
        ))}
      </div>

      <section className="border-t border-white/[0.06] py-20">
        <div className="container-shell">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="glass-panel flex flex-col items-center gap-6 rounded-3xl px-8 py-14 text-center sm:px-16"
          >
            <h2 className="max-w-lg text-2xl font-semibold sm:text-3xl">
              {PRODUCTS.length} products, one place to track every order.
            </h2>
            <p className="max-w-md text-ink-500">
              Every order you place is saved to this device, from confirmation
              through pickup.
            </p>
            <Link to="/orders" className="btn-primary">
              View my orders
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
