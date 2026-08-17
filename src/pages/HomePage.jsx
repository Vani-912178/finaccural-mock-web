import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PlanCard from '../components/PlanCard'
import heroImage from '../assets/home.png'
import './HomePage.css'

const PLANS = [
  {
    name: 'Basic',
    price: '29',
    description: 'Perfect for freelancers and small businesses getting started with financial automation.',
    features: [
      'Up to 3 user accounts',
      'Core accounting workflows',
      'Basic financial reporting',
      'Invoice & expense tracking',
      'Excel Add-in access',
      'Email support (48h response)',
    ],
    accentColor: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
  {
    name: 'Standard',
    price: '79',
    description: 'Ideal for growing teams that need advanced automation and deeper financial insights.',
    features: [
      'Up to 15 user accounts',
      'Advanced accounting automation',
      'Custom financial dashboards',
      'Multi-currency support',
      'API & Excel integration',
      'Automated accruals & deferrals',
      'Priority support (12h response)',
      'Audit trail & compliance logs',
    ],
    isMostPopular: true,
    accentColor: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  },
  {
    name: 'Premium',
    price: '149',
    description: 'Enterprise-grade solution for complex organizations requiring full financial control.',
    features: [
      'Unlimited user accounts',
      'Full ERP accounting suite',
      'Real-time consolidation',
      'Custom reporting engine',
      'Advanced Excel & BI integration',
      'Multi-entity & multi-currency',
      'Dedicated account manager',
      'SLA 99.9% uptime guarantee',
      '24/7 priority support',
    ],
    accentColor: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
  },
]

function HomePage() {
  const navigate = useNavigate()

  const handleSubscribe = (plan) => {
    localStorage.setItem('fa_selected_plan', JSON.stringify(plan))
    navigate('/payment')
  }

  return (
    <div className="page home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__heading" id="hero-heading">
              Finance operations,
              <br />
              <span className="hero__heading-gradient">made clear.</span>
            </h1>

            <p className="hero__subtext">
              <strong>FinAccrual</strong> is an intelligent financial and accounting solution designed to simplify
              business finance management. It helps businesses manage financial data, automate accounting
              workflows, and connect their financial operations efficiently — all in one unified platform.
            </p>

            <div className="hero__actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
                id="hero-cta-btn"
              >
                Explore Plans
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={() => navigate('/login')}
                id="hero-login-btn"
              >
                Sign In
              </button>
            </div>

            <p className="hero__note"><span>✓</span> 14-day free trial <i /> No credit card required <i /> Cancel anytime</p>

            {/* Stats */}
            <div className="hero__stats" role="list" aria-label="FinAccrual statistics">
              {[
                { value: '10K+', label: 'Active Businesses' },
                { value: '$2.4B', label: 'Transactions Processed' },
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '4.9★', label: 'Customer Rating' },
              ].map((s) => (
                <div key={s.label} className="hero__stat" role="listitem">
                  <span className="hero__stat-value">{s.value}</span>
                  <span className="hero__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__visual">
            <img src={heroImage} alt="FinAccrual financial platform illustration" />
          </div>

          {/* Feature highlight cards */}
          <div className="hero__features" aria-label="Key features">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                ),
                title: 'Automated Accruals',
                desc: 'AI-powered journal entries and accrual automation',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                ),
                title: 'Excel Integration',
                desc: 'Seamless sync with your existing Excel workflows',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 20V10M12 20V4M6 20v-6"/>
                  </svg>
                ),
                title: 'Real-Time Reporting',
                desc: 'Live dashboards and consolidated financial views',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: 'Bank-Grade Security',
                desc: 'SOC 2 Type II certified with end-to-end encryption',
              },
            ].map((f) => (
              <div key={f.title} className="hero__feature-card">
                <div className="hero__feature-icon" aria-hidden="true">{f.icon}</div>
                <div>
                  <h3 className="hero__feature-title">{f.title}</h3>
                  <p className="hero__feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by section */}
      <section className="trust-section" aria-label="Trusted by leading companies">
        <div className="container">
          <p className="trust-section__label">Trusted by finance teams at</p>
          <div className="trust-logos" aria-hidden="true">
            {['Nextera Corp', 'Atlas Finance', 'Meridian Group', 'Vertex Capital', 'Orion Wealth', 'Summit ERP'].map((b) => (
              <span key={b} className="trust-logo">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section-header">
            <h2 className="section-heading" id="pricing-heading">
              Choose Your Plan
            </h2>
          </div>

          <div className="pricing-grid">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.name}
                {...plan}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>

          <p className="pricing-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            All prices in USD. Taxes may apply based on your location.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <div className="navbar__logo-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', fontSize: '0.75rem', fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>FN</div>
            <span style={{ marginLeft: 10, fontWeight: 700, color: 'var(--color-text)' }}>FinAccrual</span>
          </div>
          <p className="footer__copy">© 2026 FinAccrual Inc. All rights reserved. Mock demonstration only.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
