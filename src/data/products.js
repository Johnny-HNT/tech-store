// Centralized product + category dataset.
// Adding a new product = adding an entry here. No UI changes required.
// `image` is left as a hook point: swap in a real URL or local import
// here and every card/page picks it up automatically. Until then,
// ProductVisual renders an intentional generated placeholder from
// `icon` + `accent` so nothing ever looks like a broken image.

export const CURRENCY = {
  code: 'USD',
  symbol: '$',
}

export const formatPrice = (value) =>
  `${CURRENCY.symbol}${Number(value).toFixed(2)}`

export const CATEGORIES = [
  {
    id: 'earbuds',
    label: 'Earbuds',
    icon: 'Earbuds',
    tagline: 'True wireless, tuned for everyday motion.',
    featured: true,
  },
  {
    id: 'headphones',
    label: 'Headphones',
    icon: 'Headphones',
    tagline: 'Over-ear immersion, engineered for focus.',
    featured: true,
  },
  {
    id: 'powerbanks',
    label: 'Power Banks',
    icon: 'BatteryCharging',
    tagline: 'Compact reserves of power.',
    featured: false,
  },
  {
    id: 'keyboardmouse',
    label: 'Keyboard & Mouse',
    icon: 'Keyboard',
    tagline: 'Precision input, wireless freedom.',
    featured: false,
  },
  {
    id: 'backpacks',
    label: 'Backpacks',
    icon: 'Backpack',
    tagline: 'Carry systems built around your gear.',
    featured: false,
  },
  {
    id: 'neckbands',
    label: 'Neckbands',
    icon: 'Radio',
    tagline: 'All-day audio that stays put.',
    featured: false,
  },
  {
    id: 'wiredheadphones',
    label: 'Wired Headphones',
    icon: 'Cable',
    tagline: 'Zero latency. Zero compromise.',
    featured: false,
  },
]

const PRICE = 70

export const PRODUCTS = [
  // ---------------- Earbuds (hero category) ----------------
  {
    id: 'ear-01',
    image: '/images/products/ear-01-buds-pro.jpg',
    name: 'Buds Pro',
    category: 'earbuds',
    description: 'Adaptive noise cancellation with a featherweight in-ear shell.',
    longDescription:
      'Buds Pro pairs adaptive noise cancellation with a featherweight in-ear shell tuned for six hours of continuous listening. Dual-driver acoustics balance deep low end against a clear, uncompressed top end.',
    price: PRICE,
    icon: 'Earbuds',
    accent: '#4C6FFF',
    variants: [
      { name: 'Graphite', hex: '#1A1D28' },
      { name: 'Arctic', hex: '#E8EAF0' },
      { name: 'Cobalt', hex: '#4C6FFF' },
    ],
  },
  {
    id: 'ear-02',
    image: '/images/products/ear-02-buds-air.jpg',
    name: 'Buds Air',
    category: 'earbuds',
    description: 'Ultra-compact fit with 30-hour case battery life.',
    longDescription:
      'Buds Air trims every gram without cutting playtime — a 30-hour case, IPX4 sweat resistance, and a low-profile case that disappears in a pocket.',
    price: PRICE,
    icon: 'Earbuds',
    accent: '#3EE6D8',
    variants: [
      { name: 'Graphite', hex: '#1A1D28' },
      { name: 'Mist', hex: '#C7CADA' },
    ],
  },
  {
    id: 'ear-03',
    image: '/images/products/ear-03-buds-motion.jpg',
    name: 'Buds Motion',
    category: 'earbuds',
    description: 'Secure-fit wingtips built for running and training.',
    longDescription:
      'Built for movement: secure-fit wingtips, sweat-proof housing, and a snug low-latency connection that keeps pace through intervals and long runs.',
    price: PRICE,
    icon: 'Earbuds',
    accent: '#9D5CFF',
    variants: [
      { name: 'Volt', hex: '#3EE6D8' },
      { name: 'Graphite', hex: '#1A1D28' },
    ],
  },
  {
    id: 'ear-04',
    image: '/images/products/ear-04-buds-studio.jpg',
    name: 'Buds Studio',
    category: 'earbuds',
    description: 'Reference-tuned drivers for critical listening.',
    longDescription:
      'Studio-reference tuning across a flat frequency response, so mixes and masters translate the way they were made to sound.',
    price: PRICE,
    icon: 'Earbuds',
    accent: '#4C6FFF',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'ear-05',
    image: '/images/products/ear-05-buds-mini.jpg',
    name: 'Buds Mini',
    category: 'earbuds',
    description: 'The smallest true-wireless shell we have shipped.',
    longDescription:
      'A near-invisible shell with a stem-free silhouette, matched to a case a third the size of the category average.',
    price: PRICE,
    icon: 'Earbuds',
    accent: '#3EE6D8',
    variants: [
      { name: 'Arctic', hex: '#E8EAF0' },
      { name: 'Blush', hex: '#F2A4C4' },
    ],
  },
  {
    id: 'ear-06',
    image: '/images/products/ear-06-buds-shield.jpg',
    name: 'Buds Shield',
    category: 'earbuds',
    description: 'Transparent mode tuned for situational awareness.',
    longDescription:
      'A transparency mode that lets ambient sound through naturally, tuned for commuting, cycling, and shared workspaces.',
    price: PRICE,
    icon: 'Earbuds',
    accent: '#9D5CFF',
    variants: [
      { name: 'Graphite', hex: '#1A1D28' },
      { name: 'Cobalt', hex: '#4C6FFF' },
    ],
  },
  {
    id: 'ear-07',
    image: '/images/products/ear-07-buds-flux.jpg',
    name: 'Buds Flux',
    category: 'earbuds',
    description: 'Wireless charging case with 10-minute quick-charge.',
    longDescription:
      'A ten-minute charge buys two hours of playback, backed by a case that tops up on any Qi pad you already own.',
    price: PRICE,
    icon: 'Earbuds',
    accent: '#4C6FFF',
    variants: [
      { name: 'Graphite', hex: '#1A1D28' },
      { name: 'Arctic', hex: '#E8EAF0' },
    ],
  },

  // ---------------- Headphones (hero category) ----------------
  {
    id: 'hp-01',
    image: '/images/products/hp-01-wave-one.jpg',
    name: 'Wave One',
    category: 'headphones',
    description: 'Over-ear flagship with adaptive ANC and 40-hour battery.',
    longDescription:
      'Our flagship over-ear: adaptive ANC that recalibrates to your environment every few seconds, memory-foam ear cushions, and a 40-hour battery that outlasts long-haul flights.',
    price: PRICE,
    icon: 'Headphones',
    accent: '#4C6FFF',
    variants: [
      { name: 'Graphite', hex: '#1A1D28' },
      { name: 'Arctic', hex: '#E8EAF0' },
    ],
  },
  {
    id: 'hp-02',
    name: 'Wave Lite',
    category: 'headphones',
    description: 'Lightweight on-ear design with foldable hinges.',
    longDescription:
      'A lighter, more portable take on the Wave line — foldable hinges, a travel case, and 30 hours of playback in a frame that barely registers on your head.',
    price: PRICE,
    icon: 'Headphones',
    accent: '#3EE6D8',
    variants: [
      { name: 'Mist', hex: '#C7CADA' },
      { name: 'Graphite', hex: '#1A1D28' },
    ],
  },
  {
    id: 'hp-03',
    name: 'Wave Studio',
    category: 'headphones',
    description: 'Open-back design tuned for mixing and mastering.',
    longDescription:
      'Open-back acoustics reduce driver resonance for a wider, more accurate soundstage — the choice for mixing, mastering, and long critical-listening sessions.',
    price: PRICE,
    icon: 'Headphones',
    accent: '#9D5CFF',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'hp-04',
    name: 'Wave Bass',
    category: 'headphones',
    description: 'Reinforced low end for bass-forward genres.',
    longDescription:
      'Reinforced 45mm drivers push a deeper low end without losing midrange clarity — built for bass-forward genres and club-style monitoring.',
    price: PRICE,
    icon: 'Headphones',
    accent: '#4C6FFF',
    variants: [
      { name: 'Graphite', hex: '#1A1D28' },
      { name: 'Cobalt', hex: '#4C6FFF' },
    ],
  },
  {
    id: 'hp-05',
    name: 'Wave Commute',
    category: 'headphones',
    description: 'Foldable ANC headphones built for daily transit.',
    longDescription:
      'Built for the commute: fast-pairing multipoint Bluetooth, foldable frame, and ANC tuned specifically against engine and transit rumble.',
    price: PRICE,
    icon: 'Headphones',
    accent: '#3EE6D8',
    variants: [
      { name: 'Arctic', hex: '#E8EAF0' },
      { name: 'Graphite', hex: '#1A1D28' },
    ],
  },
  {
    id: 'hp-06',
    name: 'Wave Kids',
    category: 'headphones',
    description: 'Volume-limited headphones sized for smaller heads.',
    longDescription:
      'A smaller frame and a hard 85dB volume ceiling, designed for younger listeners without sacrificing the Wave sound signature.',
    price: PRICE,
    icon: 'Headphones',
    accent: '#9D5CFF',
    variants: [
      { name: 'Volt', hex: '#3EE6D8' },
      { name: 'Blush', hex: '#F2A4C4' },
    ],
  },
  {
    id: 'hp-07',
    name: 'Wave Pro Max',
    category: 'headphones',
    description: 'Spatial audio with head-tracking and lossless codec support.',
    longDescription:
      'Head-tracked spatial audio, lossless codec support, and a redesigned driver array — the most capable headphone we build.',
    price: PRICE,
    icon: 'Headphones',
    accent: '#4C6FFF',
    variants: [
      { name: 'Graphite', hex: '#1A1D28' },
      { name: 'Arctic', hex: '#E8EAF0' },
    ],
  },

  // ---------------- Secondary categories (2 each) ----------------
  {
    id: 'pb-01',
    image: '/images/products/pb-01-core-10k.jpg',
    name: 'Core 10K',
    category: 'powerbanks',
    description: '10,000mAh power bank with 45W pass-through charging.',
    longDescription:
      'A pocketable 10,000mAh cell with 45W pass-through, enough to top up a laptop and a phone from a single port simultaneously.',
    price: PRICE,
    icon: 'BatteryCharging',
    accent: '#3EE6D8',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'pb-02',
    image: '/images/products/pb-02-core-20k.jpg',
    name: 'Core 20K',
    category: 'powerbanks',
    description: '20,000mAh power bank with dual USB-C output.',
    longDescription:
      'Double the capacity for multi-day trips, with dual USB-C output so two devices can charge at full speed at once.',
    price: PRICE,
    icon: 'BatteryCharging',
    accent: '#4C6FFF',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'km-01',
    image: '/images/products/km-01-keyset-slim.jpg',
    name: 'Keyset Slim',
    category: 'keyboardmouse',
    description: 'Low-profile wireless keyboard and mouse combo.',
    longDescription:
      'A low-profile mechanical-feel keyboard paired with a precision mouse — both on a single wireless receiver, both rated for a full year on two AA cells.',
    price: PRICE,
    icon: 'Keyboard',
    accent: '#9D5CFF',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'km-02',
    name: 'Keyset Compact',
    category: 'keyboardmouse',
    description: 'Travel-sized keyboard and mouse for hybrid work.',
    longDescription:
      'A travel-sized layout that fits any bag, with a mouse contoured for hours of comfortable use across long hybrid workdays.',
    price: PRICE,
    icon: 'Keyboard',
    accent: '#4C6FFF',
    variants: [{ name: 'Arctic', hex: '#E8EAF0' }],
  },
  {
    id: 'bp-01',
    image: '/images/products/bp-01-carry-24l.jpg',
    name: 'Carry 24L',
    category: 'backpacks',
    description: 'Weatherproof daily backpack with padded laptop bay.',
    longDescription:
      'A 24-litre daily carry with a weatherproof shell, a padded 16-inch laptop bay, and a compression system that keeps the profile slim.',
    price: PRICE,
    icon: 'Backpack',
    accent: '#4C6FFF',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'bp-02',
    name: 'Carry 18L',
    category: 'backpacks',
    description: 'Minimalist backpack sized for daily essentials.',
    longDescription:
      'A trimmer 18-litre cut for people who carry light — a padded sleeve, one organizer pocket, and nothing extra.',
    price: PRICE,
    icon: 'Backpack',
    accent: '#3EE6D8',
    variants: [{ name: 'Mist', hex: '#C7CADA' }],
  },
  {
    id: 'nb-01',
    image: '/images/products/nb-01-loop-neck.jpg',
    name: 'Loop Neck',
    category: 'neckbands',
    description: 'Magnetic-clasp neckband with 20-hour battery.',
    longDescription:
      'A magnetic clasp keeps the buds secured around your neck when not in use, backed by a 20-hour battery for full-day wear.',
    price: PRICE,
    icon: 'Radio',
    accent: '#9D5CFF',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'nb-02',
    image: '/images/products/nb-02-loop-sport.jpg',
    name: 'Loop Sport',
    category: 'neckbands',
    description: 'Sweat-resistant neckband tuned for workouts.',
    longDescription:
      'An IPX5-rated neckband with silicone ear tips that stay locked in through the hardest interval sessions.',
    price: PRICE,
    icon: 'Radio',
    accent: '#3EE6D8',
    variants: [{ name: 'Volt', hex: '#3EE6D8' }],
  },
  {
    id: 'wh-01',
    name: 'Line Studio',
    category: 'wiredheadphones',
    description: 'Wired studio headphones with detachable cable.',
    longDescription:
      'Zero-latency wired monitoring with a detachable cable and a flat frequency response built for tracking and mixing sessions.',
    price: PRICE,
    icon: 'Cable',
    accent: '#4C6FFF',
    variants: [{ name: 'Graphite', hex: '#1A1D28' }],
  },
  {
    id: 'wh-02',
    name: 'Line Everyday',
    category: 'wiredheadphones',
    description: 'Affordable wired headphones with in-line mic.',
    longDescription:
      'A dependable wired everyday pair with an in-line mic and remote, built for calls, class, and zero-battery-anxiety listening.',
    price: PRICE,
    icon: 'Cable',
    accent: '#9D5CFF',
    variants: [{ name: 'Arctic', hex: '#E8EAF0' }],
  },
]

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id)
export const getProductsByCategory = (categoryId) =>
  PRODUCTS.filter((p) => p.category === categoryId)
export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id)
