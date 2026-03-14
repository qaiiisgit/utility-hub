// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext'
import UtilityCard from '../components/UtilityCard'

const utilities = [
  {
    title: 'Calculator',
    description: 'Perform basic and advanced mathematical calculations.',
    icon: '🧮',
    path: '/utility/calculator',
    linear: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Currency Converter',
    description: 'Convert between different world currencies easily.',
    icon: '💱',
    path: '/utility/currency-converter',
    linear: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Todo List',
    description: 'Organize and manage your daily tasks effectively.',
    icon: '📝',
    path: '/utility/todo-list',
    linear: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Password Generator',
    description: 'Generate strong, secure passwords instantly.',
    icon: '🔐',
    path: '/utility/password-generator',
    linear: 'from-red-500 to-pink-500',
  },
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index for health tracking.',
    icon: '⚖️',
    path: '/utility/bmi-calculator',
    linear: 'from-purple-500 to-violet-500',
  },
  {
    title: 'Unit Converter',
    description: 'Convert between various units of measurement.',
    icon: '📐',
    path: '/utility/unit-converter',
    linear: 'from-teal-500 to-cyan-500',
  },
  // {
  //   title: 'Notepad',
  //   description: 'Quick note-taking with auto-save functionality.',
  //   icon: '📒',
  //   path: '/utility/notepad',
  //   linear: 'from-yellow-500 to-orange-500',
  // },
  // {
  //   title: 'Color Picker',
  //   description: 'Pick and convert colors in various formats.',
  //   icon: '🎨',
  //   path: '/utility/color-picker',
  //   linear: 'from-pink-500 to-rose-500',
  // },
  // {
  //   title: 'Stopwatch',
  //   description: 'Precise timing with lap tracking capabilities.',
  //   icon: '⏱️',
  //   path: '/utility/stopwatch',
  //   linear: 'from-indigo-500 to-blue-500',
  // },
  // {
  //   title: 'Age Calculator',
  //   description: 'Calculate exact age from your date of birth.',
  //   icon: '🎂',
  //   path: '/utility/age-calculator',
  //   linear: 'from-fuchsia-500 to-purple-500',
  // },
]

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Welcome back,{' '}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {user?.name}
          </span>
          ! 👋
        </h1>
        <p className="text-gray-400 text-lg">
          Select a utility tool below to get started.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Available Tools', value: utilities.length, icon: '🛠️' },
          { label: 'Categories', value: '5+', icon: '📂' },
          { label: 'Free Forever', value: '100%', icon: '✨' },
          { label: 'No Ads', value: 'Zero', icon: '🚫' },
        ].map((stat, index) => (
          <div key={index} className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Utility Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {utilities.map((utility, index) => (
          <UtilityCard key={index} {...utility} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
