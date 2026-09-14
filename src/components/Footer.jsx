import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-shell flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-ink-700">
          A showcase of tech accessories, built as an ordering prototype.
        </p>
        <nav className="flex items-center gap-5 text-sm text-ink-500" aria-label="Footer">
          <Link to="/" className="hover:text-ink-100">Home</Link>
          <Link to="/orders" className="hover:text-ink-100">My Orders</Link>
        </nav>
      </div>
    </footer>
  )
}
