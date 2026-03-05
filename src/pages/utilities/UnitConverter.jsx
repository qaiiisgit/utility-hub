// src/pages/utilities/UnitConverter.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = {
  length: {
    label: 'Length',
    icon: '📏',
    units: {
      meter: { name: 'Meter', factor: 1 },
      kilometer: { name: 'Kilometer', factor: 1000 },
      centimeter: { name: 'Centimeter', factor: 0.01 },
      millimeter: { name: 'Millimeter', factor: 0.001 },
      mile: { name: 'Mile', factor: 1609.344 },
      yard: { name: 'Yard', factor: 0.9144 },
      foot: { name: 'Foot', factor: 0.3048 },
      inch: { name: 'Inch', factor: 0.0254 },
    },
  },
  weight: {
    label: 'Weight',
    icon: '⚖️',
    units: {
      kilogram: { name: 'Kilogram', factor: 1 },
      gram: { name: 'Gram', factor: 0.001 },
      milligram: { name: 'Milligram', factor: 0.000001 },
      pound: { name: 'Pound', factor: 0.453592 },
      ounce: { name: 'Ounce', factor: 0.0283495 },
      ton: { name: 'Metric Ton', factor: 1000 },
    },
  },
  temperature: {
    label: 'Temperature',
    icon: '🌡️',
    units: {
      celsius: { name: 'Celsius' },
      fahrenheit: { name: 'Fahrenheit' },
      kelvin: { name: 'Kelvin' },
    },
  },
  volume: {
    label: 'Volume',
    icon: '🧪',
    units: {
      liter: { name: 'Liter', factor: 1 },
      milliliter: { name: 'Milliliter', factor: 0.001 },
      gallon: { name: 'US Gallon', factor: 3.78541 },
      quart: { name: 'US Quart', factor: 0.946353 },
      cup: { name: 'US Cup', factor: 0.236588 },
    },
  },
}

const UnitConverter = () => {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('kilometer')
  const [value, setValue] = useState('1')

  const convertTemperature = (val, from, to) => {
    let celsius
    if (from === 'celsius') celsius = val
    else if (from === 'fahrenheit') celsius = (val - 32) * 5 / 9
    else celsius = val - 273.15

    if (to === 'celsius') return celsius
    if (to === 'fahrenheit') return celsius * 9 / 5 + 32
    return celsius + 273.15
  }

  const convert = () => {
    const val = parseFloat(value) || 0
    if (category === 'temperature') {
      return convertTemperature(val, fromUnit, toUnit).toFixed(4)
    }
    const units = categories[category].units
    const fromFactor = units[fromUnit].factor
    const toFactor = units[toUnit].factor
    return ((val * fromFactor) / toFactor).toFixed(6)
  }

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    const unitKeys = Object.keys(categories[cat].units)
    setFromUnit(unitKeys[0])
    setToUnit(unitKeys[1])
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
        <h1 className="text-3xl font-bold text-white mb-6 text-center">📐 Unit Converter</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(categories).map(([key, { label, icon }]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`p-3 rounded-xl text-center transition-all cursor-pointer ${
                  category === key
                    ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400'
                    : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-750'
                }`}
              >
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-xs font-medium">{label}</div>
              </button>
            ))}
          </div>

          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-xl font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* From Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {Object.entries(categories[category].units).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {Object.entries(categories[category].units).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="p-6 bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl text-center">
            <div className="text-sm text-gray-400 mb-1">Result</div>
            <div className="text-3xl font-bold text-white">{convert()}</div>
            <div className="text-sm text-gray-400 mt-1">
              {categories[category].units[toUnit].name}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitConverter