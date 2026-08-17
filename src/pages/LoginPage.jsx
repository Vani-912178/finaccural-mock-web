import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [finAccrualId, setFinAccrualId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/plans')
  }

  return (
    <div className="page login-page">
      <Navbar />
      <main className="page-centered login-shell">
        <section className="login-card" aria-labelledby="login-heading">
          <div className="login-card__logo-wrap" aria-hidden="true"><span className="login-card__logo">FN</span></div>
          <p className="login-eyebrow">Secure workspace</p>
          <h1 className="login-card__heading" id="login-heading">Welcome back</h1>
          <p className="login-card__subtext">Sign in to manage your financial workspace.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div>
              <label className="form-label" htmlFor="finaccural-id">FinAccrual ID or User ID</label>
              <div className="login-input-wrap">
                <svg className="form-input-lead-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
                <input id="finaccural-id" className="login-input form-input--lead" type="text" placeholder="e.g. FA-2026-1234" value={finAccrualId} onChange={(event) => setFinAccrualId(event.target.value)} autoComplete="username" required />
              </div>
            </div>

            <div>
              <div className="form-label-row"><label className="form-label" htmlFor="password">Password</label><span className="login-field-note">Case sensitive</span></div>
              <div className="login-input-wrap">
                <svg className="form-input-lead-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
                <input id="password" className="login-input form-input--lead form-input--pad-right" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
                <button className="form-toggle-pass" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>

            <button className="btn btn-primary btn-full login-btn" type="submit">Sign in securely <span aria-hidden="true">→</span></button>
          </form>

          <p className="login-security-note"><span aria-hidden="true">⌁</span> Your data is protected with enterprise-grade security.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default LoginPage
