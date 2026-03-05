// src/components/UtilityCard.jsx
import { Link } from 'react-router-dom'

const UtilityCard = ({ title, description, icon, path, gradient }) => {
  return (
    <Link
      to={path}
      className="group block p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1"
    >
      <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
        Open Tool
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

export default UtilityCard