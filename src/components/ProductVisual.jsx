import {
  Headphones,
  BatteryCharging,
  Keyboard,
  Backpack,
  Radio,
  Cable,
} from 'lucide-react'

// True wireless earbuds aren't in lucide's set, so we compose a small
// custom glyph for that one category; everything else maps directly.
function EarbudsGlyph({ size = 40, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 10.5c0-2 1.2-3.5 3-3.5s3 1.5 3 3.5" />
      <circle cx="7" cy="13" r="2.6" />
      <path d="M9.2 11.2c1-.6 1.7-1.6 1.7-3.2" />
      <path d="M14 10.5c0-2 1.2-3.5 3-3.5s3 1.5 3 3.5" />
      <circle cx="17" cy="13" r="2.6" />
      <path d="M15.2 11.2c-1-.6-1.7-1.6-1.7-3.2" />
    </svg>
  )
}

const ICONS = {
  Earbuds: EarbudsGlyph,
  Headphones,
  BatteryCharging,
  Keyboard,
  Backpack,
  Radio,
  Cable,
}

/**
 * Renders an intentional, premium generated placeholder for a product —
 * a layered gradient field with the category glyph floating above it.
 * Swapping in a real photo later only requires setting `product.image`;
 * this component is the single place that decision is made.
 */
export default function ProductVisual({ product, className = '', size = 'md' }) {
  const Icon = ICONS[product.icon] || Headphones
  const accent = product.accent || '#4C6FFF'

  const iconSize = size === 'lg' ? 72 : size === 'sm' ? 28 : 44

  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 20% 15%, ${accent}33, transparent 60%), linear-gradient(160deg, #14161F 0%, #0B0D12 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl"
        style={{ background: accent, opacity: 0.25 }}
      />
      <div
        className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full blur-2xl"
        style={{ background: accent, opacity: 0.15 }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div
        className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
        style={{
          width: iconSize + 40,
          height: iconSize + 40,
          boxShadow: `0 0 40px -8px ${accent}55`,
        }}
      >
        <Icon size={iconSize} style={{ color: accent }} strokeWidth={1.4} />
      </div>
    </div>
  )
}
