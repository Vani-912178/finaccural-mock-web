import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaymentSuccessPage.css'

function PaymentSuccessPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('fa_payment_status') !== 'success') navigate('/')
  }, [navigate])

  const details = [
    { label: 'Security', value: '256-bit SSL encryption', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { label: 'Payment method', value: 'Credit / Debit Card', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
    { label: 'Subscription starts', value: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  ]

  return (
    <div className="success-page">
      <div className="success-page__glow" aria-hidden="true" />
      <div className="success-card" aria-live="polite">
        <div className="success-icon-wrap" aria-hidden="true"><div className="success-pulse-ring" /><div className="success-icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline className="success-check" points="20 6 9 17 4 12" /></svg></div></div>
        <div className="success-content">
          <h1 className="success-heading">Payment Successful!</h1>
          <p className="success-subtext">Your payment has been processed securely. We're setting up your FinAccrual account — this only takes a moment.</p>
          <div className="success-details" role="list" aria-label="Payment details">
            {details.map((detail) => <div key={detail.label} className="success-detail-row" role="listitem"><span className="success-detail-icon" aria-hidden="true">{detail.icon}</span><span className="success-detail-label">{detail.label}</span><span className="success-detail-value">{detail.value}</span></div>)}
          </div>
          <button className="btn btn-success btn-lg btn-full" onClick={() => navigate('/credentials')} id="continue-btn" aria-label="Continue to view your FinAccrual credentials">Continue to Your Account <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
          <p className="success-note">A confirmation will be sent to your registered email address.</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
