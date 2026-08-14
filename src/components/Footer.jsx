import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <Link className="site-footer__brand" to="/" aria-label="FinAccrual login">
          <span className="site-footer__badge">FN</span><span>FinAccrual</span>
        </Link>
        <p className="site-footer__message">Financial clarity, built for modern teams.</p>
        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link to="/plans">Plans</Link><a href="mailto:support@finaccrual.com">Support</a><a href="mailto:privacy@finaccrual.com">Privacy</a>
        </nav>
      </div>
      <div className="container site-footer__bottom"><span>© 2026 FinAccrual. All rights reserved.</span><span>Secure financial automation</span></div>
    </footer>
  )
}

export default Footer
