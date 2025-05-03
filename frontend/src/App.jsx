import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Pricings from './pages/Pricings';
import Payment from './pages/Payment';
import PaymentStatus from './pages/PaymentStatus';
import Withdraw from './pages/Withdraw';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/pricings' element={<ProtectedRoute><Pricings /></ProtectedRoute>} />
        <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/payment/status/:tx_ref" element={<ProtectedRoute><PaymentStatus /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
