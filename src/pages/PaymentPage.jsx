import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './PaymentPage.css'

function formatCardNumber(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(val) {
  const clean = val.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
  return clean
}

function generateCredentials() {
  const now = new Date()
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const rand4 = () => Math.floor(1000 + Math.random() * 9000)
  const randAlpha = () => Math.random().toString(36).slice(2, 5).toUpperCase()

  return {
    id: `FA-${dateStr}-${rand4()}`,
    userId: `FINUSER-${rand4()}`,
    password: `FIN@${randAlpha()}#${rand4()}`,
  }
}

function PaymentPage() {
  const navigate = useNavigate()
  const [plan, setPlan] = useState(null)
  const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', holder: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [cardType, setCardType] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('fa_selected_plan')
    if (!stored) { navigate('/'); return }
    setPlan(JSON.parse(stored))
  }, [navigate])

  const detectCard = (num) => {
    const n = num.replace(/\s/g, '')
    if (/^4/.test(n)) return 'VISA'
    if (/^5[1-5]/.test(n)) return 'MC'
    if (/^3[47]/.test(n)) return 'AMEX'
    return ''
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') {
      value = formatCardNumber(value)
      setCardType(detectCard(value))
    }
    if (name === 'expiry') value = formatExpiry(value)
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4)
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number.'
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Enter expiry as MM/YY.'
    if (form.cvv.length < 3) e.cvv = 'CVV must be 3-4 digits.'
    if (form.holder.trim().length < 3) e.holder = 'Enter the cardholder name.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      const creds = generateCredentials()
      localStorage.setItem('fa_payment_status', 'success')
      localStorage.setItem('fa_credentials', JSON.stringify(creds))
      navigate('/payment-success')
    }, 2000)
  }

  if (!plan) return null

  const cardDigits = form.cardNumber.replace(/\s/g, '')
  const maskedCard = cardDigits.length > 0
    ? '•••• •••• •••• ' + (cardDigits.slice(-4) || '••••')
    : '•••• •••• •••• ••••'

  return (
    <div className="page payment-page">
      <Navbar />
      <div className="payment-layout">
        {/* Left — Order Summary */}
        <aside className="order-summary" aria-label="Order summary">
          <div className="order-summary__header">
            <div className="order-summary__logo-badge" aria-hidden="true">FN</div>
            <div>
              <p className="order-summary__company">FinAccrual</p>
              <p className="order-summary__tagline">Secure Checkout</p>
            </div>
          </div>

          <div className="order-summary__plan">
            <div className="order-summary__plan-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div className="order-summary__plan-info">
              <span className="order-summary__plan-label">Selected Plan</span>
              <span className="order-summary__plan-name">{plan.name} Plan</span>
            </div>
          </div>

          <p className="order-summary__description">{plan.description}</p>

          <div className="order-summary__line">
            <span>Subscription</span>
            <span>${plan.price}/mo</span>
          </div>
          <div className="order-summary__line">
            <span>14-day trial</span>
            <span className="text-success">Free</span>
          </div>
          <div className="order-summary__line order-summary__line--total">
            <span>Due today</span>
            <span>${plan.price}</span>
          </div>

          <div className="order-summary__security">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            256-bit SSL encryption · PCI DSS compliant
          </div>
        </aside>

        {/* Right — Payment Form */}
        <main className="payment-form-area" aria-labelledby="payment-heading">
          <h1 className="payment-form-area__heading" id="payment-heading">Payment Details</h1>
          <p className="payment-form-area__subtext">Your payment information is encrypted and secure.</p>

          {/* Card Preview */}
          <div className={`card-preview ${cardType ? `card-preview--${cardType.toLowerCase()}` : ''}`} aria-label="Card preview" aria-hidden="true">
            <div className="card-preview__top">
              <div className="card-preview__chip" />
              <span className="card-preview__type">{cardType || 'CARD'}</span>
            </div>
            <div className="card-preview__number">{maskedCard}</div>
            <div className="card-preview__bottom">
              <div>
                <div className="card-preview__field-label">Card Holder</div>
                <div className="card-preview__field-value">{form.holder || 'YOUR NAME'}</div>
              </div>
              <div>
                <div className="card-preview__field-label">Expires</div>
                <div className="card-preview__field-value">{form.expiry || 'MM/YY'}</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="payment-form" onSubmit={(e) => { e.preventDefault(); handlePay() }} noValidate>
            <div className="form-group">
              <label htmlFor="holder" className="form-label">Cardholder Name</label>
              <input
                id="holder"
                name="holder"
                type="text"
                placeholder="e.g. John Smith"
                className={`form-input ${errors.holder ? 'form-input--error' : ''}`}
                value={form.holder}
                onChange={handleChange}
                autoComplete="cc-name"
                aria-describedby={errors.holder ? 'holder-err' : undefined}
              />
              {errors.holder && <span id="holder-err" className="form-error" role="alert">{errors.holder}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <div className="form-input-wrap">
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  className={`form-input ${errors.cardNumber ? 'form-input--error' : ''}`}
                  value={form.cardNumber}
                  onChange={handleChange}
                  autoComplete="cc-number"
                  aria-describedby={errors.cardNumber ? 'card-err' : undefined}
                />
                <svg className="form-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              {errors.cardNumber && <span id="card-err" className="form-error" role="alert">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry" className="form-label">Expiry Date</label>
                <input
                  id="expiry"
                  name="expiry"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  className={`form-input ${errors.expiry ? 'form-input--error' : ''}`}
                  value={form.expiry}
                  onChange={handleChange}
                  autoComplete="cc-exp"
                  aria-describedby={errors.expiry ? 'exp-err' : undefined}
                />
                {errors.expiry && <span id="exp-err" className="form-error" role="alert">{errors.expiry}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cvv" className="form-label">CVV / CVC</label>
                <input
                  id="cvv"
                  name="cvv"
                  type="password"
                  inputMode="numeric"
                  placeholder="•••"
                  className={`form-input ${errors.cvv ? 'form-input--error' : ''}`}
                  value={form.cvv}
                  onChange={handleChange}
                  autoComplete="cc-csc"
                  aria-describedby={errors.cvv ? 'cvv-err' : undefined}
                />
                {errors.cvv && <span id="cvv-err" className="form-error" role="alert">{errors.cvv}</span>}
              </div>
            </div>

            <button
              type="submit"
              id="pay-now-btn"
              className={`btn btn-primary btn-full btn-lg pay-btn ${loading ? 'pay-btn--loading' : ''}`}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                  </svg>
                  Processing Payment…
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Pay Now — ${plan.price}
                </>
              )}
            </button>
          </form>

          <p className="payment-back">
            <button className="payment-back__btn" onClick={() => navigate('/')} id="back-home-btn">
              ← Back to plans
            </button>
          </p>
        </main>
      </div>
    </div>
  )
}

export default PaymentPage
