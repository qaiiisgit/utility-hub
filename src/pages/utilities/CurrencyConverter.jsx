// src/pages/utilities/CurrencyConverter.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const exchangeRates = {
  USD: { name: 'US Dollar', symbol: '$', rate: 1 },
  EUR: { name: 'Euro', symbol: '€', rate: 0.85378 },
  GBP: { name: 'British Pound', symbol: '£', rate: 0.741145 },
  INR: { name: 'Indian Rupee', symbol: '₹', rate: 94.17 },
  JPY: { name: 'Japanese Yen', symbol: '¥', rate: 159.419 },
  CAD: { name: 'Canadian Dollar', symbol: 'C$', rate: 1.36 },
  AUD: { name: 'Australian Dollar', symbol: 'A$', rate: 1.399 },
  CHF: { name: 'Swiss Franc', symbol: 'Fr', rate: 0.88 },
  CNY: { name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
  BRL: { name: 'Brazilian Real', symbol: 'R$', rate: 4.97 },
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')

  const convert = () => {
    const amountNum = parseFloat(amount) || 0
    const fromRate = exchangeRates[fromCurrency].rate
    const toRate = exchangeRates[toCurrency].rate
    return ((amountNum / fromRate) * toRate).toFixed(2)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">💱 Currency Converter</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-2xl font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              min="0"
              step="any"
            />
          </div>

          {/* From Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {Object.entries(exchangeRates).map(([code, { name }]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full transition-all duration-300 hover:rotate-180 cursor-pointer"
            >
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {Object.entries(exchangeRates).map(([code, { name }]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="p-6 bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl text-center">
            <div className="text-sm text-gray-400 mb-1">
              {amount || '0'} {fromCurrency} =
            </div>
            <div className="text-3xl font-bold text-white">
              {exchangeRates[toCurrency].symbol}{convert()}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {toCurrency} - {exchangeRates[toCurrency].name}
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center">
            * Exchange rates are approximate and for demonstration purposes only
          </p>
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter
