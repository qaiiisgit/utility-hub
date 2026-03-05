// src/pages/utilities/BMICalculator.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const BMICalculator = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('metric')
  const [bmi, setBmi] = useState(null)

  const calculateBMI = (e) => {
    e.preventDefault()
    const w = parseFloat(weight)
    const h = parseFloat(height)

    if (!w || !h) return

    let bmiValue
    if (unit === 'metric') {
      const heightM = h / 100
      bmiValue = w / (heightM * heightM)
    } else {
      bmiValue = (w / (h * h)) * 703
    }
    setBmi(bmiValue.toFixed(1))
  }

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', tip: 'Consider gaining weight through a balanced diet.' }
    if (bmi < 25) return { label: 'Normal', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', tip: 'Great! Maintain your healthy lifestyle.' }
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', tip: 'Consider increasing physical activity.' }
    return { label: 'Obese', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', tip: 'Consult with a healthcare provider.' }
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
        <h1 className="text-3xl font-bold text-white mb-6 text-center">⚖️ BMI Calculator</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          {/* Unit Toggle */}
          <div className="flex bg-gray-800 rounded-xl p-1">
            {['metric', 'imperial'].map(u => (
              <button
                key={u}
                onClick={() => { setUnit(u); setBmi(null); setWeight(''); setHeight('') }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize cursor-pointer ${
                  unit === u ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <form onSubmit={calculateBMI} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                min="0"
                step="any"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                min="0"
                step="any"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder={unit === 'metric' ? 'e.g., 175' : 'e.g., 69'}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
            >
              Calculate BMI
            </button>
          </form>

          {/* Result */}
          {bmi && (
            <div className={`p-6 rounded-xl border ${getCategory(bmi).bg}`}>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Your BMI</div>
                <div className={`text-5xl font-bold mb-2 ${getCategory(bmi).color}`}>{bmi}</div>
                <div className={`text-lg font-semibold ${getCategory(bmi).color}`}>
                  {getCategory(bmi).label}
                </div>
                <p className="text-sm text-gray-400 mt-3">{getCategory(bmi).tip}</p>
              </div>
            </div>
          )}

          {/* BMI Scale */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">BMI Categories</h3>
            {[
              { range: 'Below 18.5', label: 'Underweight', color: 'bg-blue-500' },
              { range: '18.5 - 24.9', label: 'Normal', color: 'bg-green-500' },
              { range: '25 - 29.9', label: 'Overweight', color: 'bg-yellow-500' },
              { range: '30 or above', label: 'Obese', color: 'bg-red-500' },
            ].map((cat, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                <span className="text-gray-400">{cat.range}</span>
                <span className="text-gray-500">—</span>
                <span className="text-gray-300">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BMICalculator