# Tech Showcase & Ordering Prototype

A premium, futuristic React storefront and order-management prototype for
modern tech accessories — earbuds, headphones, power banks, keyboards &
mice, backpacks, neckbands, and wired headphones.

No backend is required: orders persist to `localStorage` through a single
storage utility (`src/utils/storage.js`), designed so a real backend
(Firebase, Supabase, or a custom API) can be swapped in later by rewriting
just that one file.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Routes

| Path              | Purpose                                   |
| ------------------ | ------------------------------------------ |
| `/`                | Home — hero, category nav, product catalog |
| `/buy/:productId`  | Product purchase & checkout flow           |
| `/orders`          | Customer order history (this device)       |
| `/master`          | Internal order-management dashboard        |

## Project structure

```
src/
├── components/   Reusable UI building blocks
├── pages/        Route-level views
├── data/         Centralized product & category dataset
├── utils/        storage, order helpers, formatters
├── App.jsx       Routing + shared layout
└── main.jsx      Entry point
```

## Notes

- Every product currently costs 70 units in `CURRENCY` (see
  `src/data/products.js`) — change `CURRENCY.symbol` there to relabel the
  currency everywhere at once.
- Product photography is a placeholder system (`ProductVisual.jsx`) that
  renders a category glyph over a generated gradient field. Swap in real
  photography by setting `image` on any product in `src/data/products.js`.
- Respects `prefers-reduced-motion` throughout.
