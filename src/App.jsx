import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PaymentPage from './pages/PaymentPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import CredentialsPage from './pages/CredentialsPage'
import ExcelPage from './pages/ExcelPage'
import LoginPage from './pages/LoginPage'
import FreeTrialPage from './pages/FreeTrialPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/plans" element={<HomePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/credentials" element={<CredentialsPage />} />
      <Route path="/excel" element={<ExcelPage />} />
      <Route path="/free-trial" element={<FreeTrialPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
