import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './FreeTrialPage.css'

function FreeTrialPage() {
  const navigate = useNavigate()

  const handleStartTrial = () => {
    // Generate mock credentials for the user so they are "logged in"
    const now = new Date()
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
    const rand4 = () => Math.floor(1000 + Math.random() * 9000)
    const randAlpha = () => Math.random().toString(36).slice(2, 5).toUpperCase()
    
    const creds = {
      id: `FA-${dateStr}-${rand4()}`,
      userId: `FARTRIAL-${rand4()}`,
      password: `TRIAL@${randAlpha()}#${rand4()}`,
    }

    localStorage.setItem('fa_payment_status', 'success')
    localStorage.setItem('fa_credentials', JSON.stringify(creds))
    localStorage.setItem('fa_selected_plan', JSON.stringify({
      name: 'Trial (Standard)',
      price: '0',
      description: '14-Day Free Trial access with standard automated accrual features.'
    }))
    localStorage.setItem('fa_logged_in', 'true')

    // Navigate to Excel workspace Page
    navigate('/excel')
  }

  return (
    <div className="page trial-page">
      <Navbar />
      <main className="page-centered trial-shell">
        <section className="trial-card" aria-labelledby="trial-heading">
          <div className="trial-card__logo-wrap" aria-hidden="true">
            <span className="trial-card__logo">FN</span>
            <div className="trial-card__logo-pulse" />
          </div>
          
          <h1 className="trial-card__heading" id="trial-heading">Start your 14-Day Free Trial</h1>
          <p className="trial-card__subtext">
            Experience our intelligent financial ERP with no credit card required. Cancel or upgrade anytime.
          </p>

          <div className="trial-details-box">
            <div className="trial-details-box__header">
              <h3>Standard Plan Trial</h3>
              <span className="trial-price-tag">Free</span>
            </div>
            <ul className="trial-features-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Core accounting & accrual automation
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Excel Integration & Live Sync
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Real-Time Reporting Dashboards
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Up to 15 user accounts
              </li>
            </ul>
          </div>

          <button 
            className="btn btn-primary btn-full btn-lg trial-btn" 
            type="button" 
            onClick={handleStartTrial}
            id="start-free-trial-btn"
          >
            Start Free Trial
          </button>

          <p className="trial-back">
            <button className="trial-back__btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default FreeTrialPage
