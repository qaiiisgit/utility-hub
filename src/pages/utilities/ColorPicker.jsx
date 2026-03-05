// src/pages/utilities/ColorPicker.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ColorPicker = () => {
  const [color, setColor] = useState('#6366f1')
  const [savedColors, setSavedColors] = useState([])
  const [copied, setCopied] = useState('')

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return null
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const copyValue = (value, label) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  const saveColor = () => {
    if (!savedColors.includes(color)) {
      setSavedColors(prev => [...prev, color])
    }
  }

  const colorFormats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '' },
    { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">🎨 Color Picker</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          {/* Color Preview */}
          <div
            className="w-full h-48 rounded-xl border-2 border-gray-700 transition-all duration-300"
            style={{ backgroundColor: color }}
          />

          {/* Color Input */}
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-14 h-14 rounded-xl cursor-pointer border-2 border-gray-700"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <button
              onClick={saveColor}
              className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>

          {/* Color Formats */}
          <div className="space-y-3">
            {colorFormats.map(format => (
              <div
                key={format.label}
                onClick={() => copyValue(format.value, format.label)}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-750 transition-colors"
              >
                <div>
                  <span className="text-xs text-gray-500">{format.label}</span>
                  <div className="text-white font-mono text-sm">{format.value}</div>
                </div>
                <span className="text-xs text-gray-400">
                  {copied === format.label ? '✅ Copied!' : '📋 Copy'}
                </span>
              </div>
            ))}
          </div>

          {/* RGB Sliders */}
          {rgb && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">RGB Values</h3>
              {[
                { label: 'R', value: rgb.r, color: 'accent-red-500' },
                { label: 'G', value: rgb.g, color: 'accent-green-500' },
                { label: 'B', value: rgb.b, color: 'accent-blue-500' },
              ].map(channel => (
                <div key={channel.label} className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm w-4">{channel.label}</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={channel.value}
                    onChange={(e) => {
                      const newRgb = { ...rgb }
                      newRgb[channel.label.toLowerCase()] = parseInt(e.target.value)
                      const hex = '#' + [newRgb.r, newRgb.g, newRgb.b].map(v => v.toString(16).padStart(2, '0')).join('')
                      setColor(hex)
                    }}
                    className={`flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer ${channel.color}`}
                  />
                  <span className="text-gray-400 text-sm w-8 text-right">{channel.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Saved Colors */}
          {savedColors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">Saved Colors</h3>
              <div className="flex flex-wrap gap-2">
                {savedColors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(c)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-700 hover:border-white transition-colors cursor-pointer hover:scale-110"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ColorPicker