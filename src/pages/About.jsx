// src/pages/About.jsx
const About = () => {
  const team = [
    { name: 'Mohammad Qais Khan', role: 'Founder & Developer', emoji: '👨‍💻' },
    { name: 'Harris', role: 'UI/UX Designer', emoji: '🎨' },
    { name: 'Sonu Kumar', role: 'Backend Developer', emoji: '⚙️' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          About{' '}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            UtilityHub
          </span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          We believe everyday tools should be simple, beautiful, and accessible to everyone.
          UtilityHub brings together essential utilities in one seamless platform.
        </p>
      </div>

      {/* Mission */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">🎯 Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            To provide a comprehensive, free, and ad-free utility platform that helps people
            perform everyday tasks efficiently. We focus on simplicity and user experience
            above everything else.
          </p>
        </div>
        <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">👁️ Our Vision</h2>
          <p className="text-gray-400 leading-relaxed">
            To become the go-to platform for everyday utility tools, constantly expanding our
            collection based on user feedback and needs. We envision a world where useful
            tools are always just a click away.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
        <p className="text-gray-400">The people behind UtilityHub</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div key={index} className="text-center p-8 bg-gray-900 border border-gray-800 rounded-2xl hover:border-indigo-500/30 transition-all duration-300">
            <div className="text-5xl mb-4">{member.emoji}</div>
            <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
            <p className="text-indigo-400 text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About