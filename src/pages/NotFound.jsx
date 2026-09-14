import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import EmptyState from '../components/EmptyState'

export default function NotFound() {
  return (
    <div className="container-shell py-24">
      <EmptyState
        icon={Compass}
        title="This page doesn't exist"
        message="Check the address, or head back to browse products."
        action={
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        }
      />
    </div>
  )
}
