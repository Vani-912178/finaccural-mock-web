import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar({ transparent = false }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = () => navigate('/')

  const handleLogo = () => navigate('/')

  return (
    <nav className={`navbar ${transparent ? 'navbar--transparent' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Logo */}
        <button className="navbar__logo" onClick={handleLogo} aria-label="FinAccrual Home" id="nav-logo-btn">
          <span className="navbar__logo-badge">FN</span>
          <span className="navbar__logo-text">FinAccrual</span>
        </button>

        {/* Right side */}
        <div className="navbar__right">
          <button
            className="btn btn-outline btn-sm"
            onClick={handleLogin}
            id="nav-login-btn"
            aria-label="Login"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
