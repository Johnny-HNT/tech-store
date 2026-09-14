import { AlertCircle } from 'lucide-react'

// Fixed pickup points — customers choose one instead of typing a delivery
// address. Add/remove/reorder locations here; nothing else needs to change.
export const PICKUP_LOCATIONS = [
  'Library mall',
  'Parade ground',
  'Brunai',
  'K.S.B.',
  'Manchester hostel',
]

export default function CustomerForm({ values, onChange, errors }) {
  const handleChange = (id) => (e) => {
    onChange({ ...values, [id]: e.target.value })
  }

  const addressErrorId = 'address-error'
  const hasAddressError = Boolean(errors?.address)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-ink-300">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name || ''}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors?.name)}
          aria-describedby={errors?.name ? 'name-error' : undefined}
          className={`rounded-xl border bg-white/[0.03] px-4 py-3 text-ink-100 placeholder:text-ink-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-violet ${
            errors?.name ? 'border-rose-500/60' : 'border-white/10 focus:border-signal-blue/50'
          }`}
          placeholder="Jordan Rivera"
        />
        {errors?.name && (
          <p id="name-error" role="alert" className="flex items-center gap-1.5 text-sm text-rose-400">
            <AlertCircle size={14} />
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="address" className="text-sm font-medium text-ink-300">
          Pickup location
        </label>
        <select
          id="address"
          name="address"
          value={values.address || ''}
          onChange={handleChange('address')}
          aria-invalid={hasAddressError}
          aria-describedby={hasAddressError ? addressErrorId : undefined}
          className={`rounded-xl border bg-white/[0.03] px-4 py-3 text-ink-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-violet ${
            hasAddressError ? 'border-rose-500/60' : 'border-white/10 focus:border-signal-blue/50'
          }`}
        >
          <option value="" disabled>
            Select a pickup point
          </option>
          {PICKUP_LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        {hasAddressError && (
          <p id={addressErrorId} role="alert" className="flex items-center gap-1.5 text-sm text-rose-400">
            <AlertCircle size={14} />
            {errors.address}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-ink-300">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone || ''}
          onChange={handleChange('phone')}
          aria-invalid={Boolean(errors?.phone)}
          aria-describedby={errors?.phone ? 'phone-error' : undefined}
          className={`rounded-xl border bg-white/[0.03] px-4 py-3 text-ink-100 placeholder:text-ink-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-violet ${
            errors?.phone ? 'border-rose-500/60' : 'border-white/10 focus:border-signal-blue/50'
          }`}
          placeholder="(555) 123-4567"
        />
        {errors?.phone && (
          <p id="phone-error" role="alert" className="flex items-center gap-1.5 text-sm text-rose-400">
            <AlertCircle size={14} />
            {errors.phone}
          </p>
        )}
      </div>
    </div>
  )
}

export function validateCustomer(values) {
  const errors = {}
  if (!values.name || !values.name.trim()) {
    errors.name = 'Enter the name for this pickup.'
  }
  if (!values.address || !PICKUP_LOCATIONS.includes(values.address)) {
    errors.address = 'Choose a pickup location.'
  }
  if (!values.phone || !values.phone.trim()) {
    errors.phone = 'Enter a phone number.'
  } else if (!/^[\d\s+().-]{7,}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }
  return errors
}
