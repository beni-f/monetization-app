import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import axiosInstance from '../axios';

const BANKS = [
  { name: "Abay Bank", code: 130 },
  { name: "Addis International Bank", code: 772 },
  { name: "Ahadu Bank", code: 207 },
  { name: "Awash Bank", code: 656 },
  { name: "Bank of Abyssinia", code: 347 },
  { name: "Berhan Bank", code: 571 },
  { name: "CBEBirr", code: 128 },
  { name: "Commercial Bank of Ethiopia(CBE)", code: 946 },
  { name: "Coopay-Ebirr", code: 893 },
];

const Withdraw = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    account_name: '',
    account_number: '',
    bank_code: '',
    amount: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const MIN_WITHDRAWAL = 100;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.account_name || !formData.account_number || !formData.bank_code || !formData.amount) {
      setError('Please fill all fields');
      return;
    }

    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum) || amountNum < MIN_WITHDRAWAL) {
      setError(`Minimum withdrawal is ${MIN_WITHDRAWAL} coins`);
      return;
    }

    if (amountNum > user.coins) {
      setError('Insufficient coins');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/withdraw/', {
        ...formData,
        amount: amountNum
      });

      setSuccess(`Withdrawal request submitted successfully! Reference: ${response.data.reference}`);
      setTimeout(() => {
        navigate('/home')
      }, 1000)
      setFormData({
        account_name: '',
        account_number: '',
        bank_code: '',
        amount: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Withdrawal failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center p-6">
      <Sidebar />
      <div className="w-full max-w-md bg-black rounded-xl p-6 border border-yellow-400 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">WITHDRAW COINS</h1>
        <div className="border-b border-yellow-400 mb-6"></div>

        <div className="mb-6">
          <p className="text-lg">Balance: <span className="text-yellow-300">{user?.coins || 0} coins</span></p>
          <p className="text-sm text-gray-400">Minimum: {MIN_WITHDRAWAL} coins</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Account Holder Name</label>
            <input
              type="text"
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-yellow-400 border border-yellow-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Bank</label>
            <select
              name="bank_code"
              value={formData.bank_code}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-yellow-400 border border-yellow-400 focus:outline-none"
              required
            >
              <option value="" disabled>Select your bank</option>
              {BANKS.map(bank => (
                <option key={bank.code} value={bank.code}>{bank.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Account Number</label>
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-yellow-400 border border-yellow-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Amount (coins)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min={MIN_WITHDRAWAL}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-yellow-400 border border-yellow-400 focus:outline-none"
              required
            />
          </div>

          {error && <div className="bg-red-900 text-red-300 p-3 rounded-md">{error}</div>}
          {success && <div className="bg-green-900 text-green-300 p-3 rounded-md">{success}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-bold ${loading ? 'bg-gray-600 text-gray-300' : 'bg-yellow-400 text-black hover:bg-yellow-300'}`}
          >
            {loading ? 'Processing...' : 'WITHDRAW'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;