import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <section className="site-footer__intro" aria-label="FinAccrual">
          <Link className="site-footer__brand" to="/" aria-label="FinAccrual login">
            <span className="site-footer__badge">FN</span><span>FinAccrual</span>
          </Link>
          <p>Clear, reliable financial automation for modern finance teams.</p>
          <div className="site-footer__trust" aria-label="Security features">
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg> Secure access</span>
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/></svg> Data protected</span>
          </div>
        </section>

        <nav className="site-footer__column" aria-label="Product links">
          <h2>Product</h2>
          <Link to="/plans">Plans & pricing</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/excel">Excel Add-in</Link>
        </nav>

        <nav className="site-footer__column" aria-label="Resource links">
          <h2>Resources</h2>
          <a href="mailto:support@finaccrual.com">Help center</a>
          <a href="mailto:support@finaccrual.com">Contact support</a>
          <a href="mailto:support@finaccrual.com?subject=Demo%20request">Request a demo</a>
        </nav>

        <section className="site-footer__contact" aria-label="Support contact">
          <h2>Need help?</h2>
          <p>Our support team is here when you need us.</p>
          <a className="site-footer__support-btn" href="mailto:support@finaccrual.com">Contact support <span aria-hidden="true">→</span></a>
        </section>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 FinAccrual. All rights reserved.</span>
        <div className="site-footer__legal"><a href="mailto:privacy@finaccrual.com">Privacy</a><a href="mailto:legal@finaccrual.com">Terms</a><a href="mailto:security@finaccrual.com">Security</a></div>
      </div>
    </footer>
  )
}

export default Footer
