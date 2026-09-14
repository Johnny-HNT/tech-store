import { motion, useReducedMotion } from 'framer-motion'

/**
 * Ambient gradient field used behind the hero and section headers.
 * Static (no motion) when the user prefers reduced motion, but still
 * looks intentional — never a blank void.
 */
export default function AnimatedBackground({ variant = 'hero' }) {
  const prefersReducedMotion = useReducedMotion()

  const blobs =
    variant === 'hero'
      ? [
          { color: '#4C6FFF', size: 520, top: '-10%', left: '5%', delay: 0 },
          { color: '#9D5CFF', size: 460, top: '10%', left: '55%', delay: 0.4 },
          { color: '#3EE6D8', size: 320, top: '55%', left: '25%', delay: 0.8 },
        ]
      : [{ color: '#4C6FFF', size: 380, top: '-15%', left: '30%', delay: 0 }]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: blob.color,
            opacity: 0.16,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { y: [0, -30, 0], opacity: [0.14, 0.22, 0.14] }
          }
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-grid-fade" />
    </div>
  )
}
