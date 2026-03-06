// src/components/Footer.jsx
import { Link } from 'react-router-dom'

const Footer = () => {
  const socialLinks = {
    Twitter: "https://twitter.com/yourusername",
    GitHub: "https://github.com/qaiiisgit",
    LinkedIn: "https://linkedin.com/in/md-qais-khan"
  };
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                UtilityHub
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              Your all-in-one utility platform for everyday tools. From calculators to converters,
              we've got everything you need in one place.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-indigo-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {['Calculator', 'Currency Converter', 'Password Generator', 'Todo List'].map(item => (
                <li key={item}>
                  <span className="text-gray-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} UtilityHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            {Object.entries(socialLinks).map(([social, link]) => (
              <a
                key={social}
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className="text-gray-500 hover:text-indigo-400 text-sm transition-colors">
                {social}

              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
