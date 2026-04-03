// src/pages/utilities/Calculator.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [hasResult, setHasResult] = useState(false)

  const handleNumber = (num) => {
    if (hasResult) {
      setDisplay(num)
      setEquation('')
      setHasResult(false)
    } else {
      setDisplay(prev => prev === '0' ? num : prev + num)
    }
  }

  const handleOperator = (op) => {
    setHasResult(false)
    setEquation(display + ' ' + op + ' ')
    setDisplay('0')
  }

  const handleEquals = () => {
    try {
      const fullEquation = equation + display
      // Using Function constructor instead of eval for safety
      const sanitized = fullEquation.replace(/[^0-9+\-*/.() ]/g, '')
      const result = new Function('return ' + sanitized)()
      const formatted = parseFloat(result.toFixed(10)).toString()
      setDisplay(formatted)
      setEquation(fullEquation + ' =')
      setHasResult(true)
    } catch {
      setDisplay('Error')
      setHasResult(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
    setHasResult(false)
  }

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(prev => prev.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.')
    }
  }

  const handlePercent = () => {
    setDisplay(prev => (parseFloat(prev) / 100).toString())
  }

  const handleNegate = () => {
    setDisplay(prev => (parseFloat(prev) * -1).toString())
  }

  const buttons = [
    { label: 'AC', action: handleClear, style: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '±', action: handleNegate, style: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '%', action: handlePercent, style: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '÷', action: () => handleOperator('/'), style: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
    { label: '7', action: () => handleNumber('7'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '8', action: () => handleNumber('8'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '9', action: () => handleNumber('9'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '×', action: () => handleOperator('*'), style: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
    { label: '4', action: () => handleNumber('4'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '5', action: () => handleNumber('5'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '6', action: () => handleNumber('6'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '−', action: () => handleOperator('-'), style: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
    { label: '1', action: () => handleNumber('1'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '2', action: () => handleNumber('2'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '3', action: () => handleNumber('3'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '+', action: () => handleOperator('+'), style: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
    { label: 'DEL', action: handleDelete, style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '0', action: () => handleNumber('0'), style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '.', action: handleDecimal, style: 'bg-gray-800 hover:bg-gray-600 text-white' },
    { label: '=', action: handleEquals, style: 'bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">🧮 Calculator</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Display */}
          <div className="p-6 bg-gray-950">
            <div className="text-right text-gray-500 text-sm h-6 mb-1 overflow-hidden">
              {equation}
            </div>
            <div className="text-right text-white text-4xl font-light tracking-wider overflow-x-auto">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-1 p-3">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.action}
                className={`${btn.style} p-4 rounded-xl text-lg font-medium transition-all duration-200 active:scale-95 cursor-pointer`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
