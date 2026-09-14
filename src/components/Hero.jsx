import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import ProductVisual from './ProductVisual'
import { PRODUCTS } from '../data/products'

const floatProducts = [
  PRODUCTS.find((p) => p.id === 'ear-01'),
  PRODUCTS.find((p) => p.id === 'hp-01'),
  PRODUCTS.find((p) => p.id === 'pb-01'),
].filter(Boolean)

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ onExplore }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden pt-10">
      <AnimatedBackground variant="hero" />

      <div className="container-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-ink-300"
          >
            Everyday tech, reimagined
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Tech that moves with you.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-lg text-ink-500">
            Earbuds, headphones, and everyday carry built around one idea: gear
            that keeps up, and gets out of your way.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button type="button" onClick={onExplore} className="btn-primary">
              Explore products
            </button>
            <a href="#category-earbuds" className="btn-secondary">
              See earbuds
            </a>
          </motion.div>
        </motion.div>

        <div className="relative hidden h-[420px] lg:block" aria-hidden="true">
          {floatProducts.map((product, i) => {
            const positions = [
              { top: '4%', left: '10%', size: 190, rotate: -6 },
              { top: '38%', left: '52%', size: 210, rotate: 4 },
              { top: '62%', left: '4%', size: 150, rotate: 8 },
            ]
            const pos = positions[i]
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: prefersReducedMotion ? 0 : [0, -16, 0],
                }}
                transition={{
                  opacity: { delay: 0.3 + i * 0.15, duration: 0.6 },
                  scale: { delay: 0.3 + i * 0.15, duration: 0.6 },
                  y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                }}
                className="absolute overflow-hidden rounded-3xl border border-white/10 shadow-glow-lg"
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: pos.size,
                  height: pos.size,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
              >
                <ProductVisual product={product} size="lg" />
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-700 transition-colors hover:text-ink-300"
        aria-label="Scroll to products"
      >
        <span className="text-xs uppercase tracking-wide">Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  )
}
