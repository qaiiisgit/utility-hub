// src/pages/utilities/AgeCalculator.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState(null)

  const calculateAge = (e) => {
    e.preventDefault()
    if (!birthDate) return

    const birth = new Date(birthDate)
    const today = new Date()

    if (birth > today) {
      setResult(null)
      return
    }

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = totalDays * 24
    const totalMinutes = totalHours * 60

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24))

    setResult({
      years, months, days,
      totalDays, totalWeeks, totalHours, totalMinutes,
      daysToNextBirthday,
      dayOfBirth: birth.toLocaleDateString('en-US', { weekday: 'long' }),
    })
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
        <h1 className="text-3xl font-bold text-white mb-6 text-center">🎂 Age Calculator</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <form onSubmit={calculateAge} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
            >
              Calculate Age
            </button>
          </form>

          {result && (
            <div className="space-y-6">
              {/* Main Age Display */}
              <div className="p-6 bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl text-center">
                <div className="text-sm text-gray-400 mb-2">Your Age</div>
                <div className="flex justify-center gap-6">
                  {[
                    { value: result.years, label: 'Years' },
                    { value: result.months, label: 'Months' },
                    { value: result.days, label: 'Days' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-4xl font-bold text-white">{item.value}</div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Days', value: result.totalDays.toLocaleString(), icon: '📅' },
                  { label: 'Total Weeks', value: result.totalWeeks.toLocaleString(), icon: '📆' },
                  { label: 'Total Hours', value: result.totalHours.toLocaleString(), icon: '⏰' },
                  { label: 'Total Minutes', value: result.totalMinutes.toLocaleString(), icon: '⏱️' },
                ].map(stat => (
                  <div key={stat.label} className="p-4 bg-gray-800 rounded-xl">
                    <div className="text-lg mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Fun Facts */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
                  <span className="text-xl">📅</span>
                  <div>
                    <div className="text-xs text-gray-400">Born on</div>
                    <div className="text-sm text-white">{result.dayOfBirth}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
                  <span className="text-xl">🎉</span>
                  <div>
                    <div className="text-xs text-gray-400">Next birthday in</div>
                    <div className="text-sm text-white">{result.daysToNextBirthday} days</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgeCalculator