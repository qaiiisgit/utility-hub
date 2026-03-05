// src/pages/utilities/PasswordGenerator.jsx
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

const PasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let chars = ''
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (options.numbers) chars += '0123456789'
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) {
      setPassword('Select at least one option')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }, [length, options])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    let score = 0
    if (length >= 12) score++
    if (length >= 16) score++
    if (options.uppercase) score++
    if (options.lowercase) score++
    if (options.numbers) score++
    if (options.symbols) score++

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '25%' }
    if (score <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '50%' }
    if (score <= 5) return { label: 'Strong', color: 'bg-blue-500', width: '75%' }
    return { label: 'Very Strong', color: 'bg-green-500', width: '100%' }
  }

  const strength = getStrength()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">🔐 Password Generator</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          {/* Password Display */}
          <div className="p-4 bg-gray-950 rounded-xl">
            <div className="flex items-center justify-between gap-3">
              <span className="text-lg font-mono text-white break-all flex-1">
                {password || 'Click generate to create a password'}
              </span>
              {password && (
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-400 hover:text-indigo-400 transition-colors shrink-0 cursor-pointer"
                >
                  {copied ? '✅' : '📋'}
                </button>
              )}
            </div>
            {password && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Strength</span>
                  <span className="text-gray-400">{strength.label}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Length Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Password Length</label>
              <span className="text-sm text-indigo-400 font-semibold">{length}</span>
            </div>
            <input
              type="range"
              min="6"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6</span>
              <span>50</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">Include Characters</label>
            {[
              { key: 'uppercase', label: 'Uppercase (A-Z)', sample: 'ABCDEFGH' },
              { key: 'lowercase', label: 'Lowercase (a-z)', sample: 'abcdefgh' },
              { key: 'numbers', label: 'Numbers (0-9)', sample: '01234567' },
              { key: 'symbols', label: 'Symbols (!@#$)', sample: '!@#$%^&*' },
            ].map(option => (
              <label
                key={option.key}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-750 transition-colors"
              >
                <div>
                  <span className="text-sm text-white">{option.label}</span>
                  <span className="text-xs text-gray-500 ml-2 font-mono">{option.sample}</span>
                </div>
                <input
                  type="checkbox"
                  checked={options[option.key]}
                  onChange={() => setOptions(prev => ({ ...prev, [option.key]: !prev[option.key] }))}
                  className="w-5 h-5 rounded accent-indigo-500 cursor-pointer"
                />
              </label>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
          >
            Generate Password 🔄
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator