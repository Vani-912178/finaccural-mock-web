import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './CredentialsPage.css'

function CredentialsPage() {
  const navigate = useNavigate()
  const [creds, setCreds] = useState(null)
  const [plan, setPlan] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const storedCreds = localStorage.getItem('fa_credentials')
    const storedPlan = localStorage.getItem('fa_selected_plan')
    if (!storedCreds || localStorage.getItem('fa_payment_status') !== 'success') {
      navigate('/')
      return
    }
    setCreds(JSON.parse(storedCreds))
    if (storedPlan) setPlan(JSON.parse(storedPlan))
    // Mark user as logged in
    localStorage.setItem('fa_logged_in', 'true')
  }, [navigate])

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field)
      setTimeout(() => setCopied(''), 2000)
    })
  }

  if (!creds) return null

  const fields = [
    { id: 'fa-id',       label: 'FinAccrual ID',  value: creds.id,       icon: '🔑', field: 'id' },
    { id: 'fa-userid',   label: 'User ID',         value: creds.userId,   icon: '👤', field: 'userId' },
    { id: 'fa-password', label: 'Password',         value: creds.password, icon: '🔒', field: 'password', isPassword: true },
  ]

  return (
    <div className="page creds-page">
      <Navbar />
      <div className="creds-layout">
        <div className="creds-card" role="main" aria-labelledby="creds-heading">
          {/* Header */}
          <div className="creds-card__header">
            <div className="creds-card__logo-wrap" aria-hidden="true">
              <div className="creds-card__logo">FN</div>
              <div className="creds-card__logo-pulse" />
            </div>
            <div>
              <div className="creds-badge">Account Created</div>
              <h1 className="creds-heading" id="creds-heading">Your FinAccrual Account</h1>
              <p className="creds-subtext">
                Your account has been created successfully. Keep these credentials safe —
                you'll need them to log into FinAccrual and the Excel Add-in.
              </p>
            </div>
          </div>

          {/* Plan badge */}
          {plan && (
            <div className="creds-plan-badge" aria-label={`Subscribed to ${plan.name} plan`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
              {plan.name} Plan — ${plan.price}/month
            </div>
          )}

          {/* Credential Fields */}
          <div className="creds-fields" role="list" aria-label="Account credentials">
            {fields.map((f) => (
              <div key={f.id} className="creds-field" role="listitem">
                <div className="creds-field__icon" aria-hidden="true">{f.icon}</div>
                <div className="creds-field__body">
                  <label htmlFor={f.id} className="creds-field__label">{f.label}</label>
                  <div className="creds-field__value-wrap">
                    <span
                      id={f.id}
                      className="creds-field__value"
                      aria-label={`${f.label}: ${f.isPassword && !showPassword ? 'hidden' : f.value}`}
                    >
                      {f.isPassword && !showPassword
                        ? '•'.repeat(f.value.length)
                        : f.value}
                    </span>
                    <div className="creds-field__actions">
                      {f.isPassword && (
                        <button
                          className="creds-action-btn"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          title={showPassword ? 'Hide' : 'Show'}
                        >
                          {showPassword ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                              <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          )}
                        </button>
                      )}
                      <button
                        className={`creds-action-btn ${copied === f.field ? 'creds-action-btn--copied' : ''}`}
                        onClick={() => copyToClipboard(f.value, f.field)}
                        aria-label={`Copy ${f.label}`}
                        title="Copy"
                      >
                        {copied === f.field ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="creds-note" role="note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>
              Please save your credentials in a secure location. Your password cannot be
              recovered once this page is closed.
            </span>
          </div>

          {/* Open Excel CTA */}
          <button
            className="btn btn-primary btn-lg btn-full open-excel-btn"
            onClick={() => navigate('/excel')}
            id="open-excel-btn"
            aria-label="Open FinAccrual Excel Application"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            Open Excel
          </button>

          <p className="creds-login-note">
            You can also{' '}
            <button className="creds-link" onClick={() => navigate('/login')} id="go-login-btn">
              sign in
            </button>{' '}
            with these credentials at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CredentialsPage
