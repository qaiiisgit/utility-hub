// // src/pages/Contact.jsx
// import { useState } from 'react'

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
//   const [submitted, setSubmitted] = useState(false)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setSubmitted(true)
//     setFormData({ name: '', email: '', subject: '', message: '' })
//     setTimeout(() => setSubmitted(false), 3000)
//   }

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//       <div className="text-center max-w-3xl mx-auto mb-16">
//         <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
//           Get in{' '}
//           <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//             Touch
//           </span>
//         </h1>
//         <p className="text-lg text-gray-400">
//           Have questions, suggestions, or feedback? We'd love to hear from you.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
//         {/* Contact Info */}
//         <div className="space-y-8">
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
//             <p className="text-gray-400 mb-8">
//               Fill out the form and our team will get back to you within 24 hours.
//             </p>
//           </div>

//           {[
//             { icon: '📧', label: 'Email', value: 'contact@utilityhub.com' },
//             { icon: '📍', label: 'Location', value: 'Bhilai, India' },
//             { icon: '🕐', label: 'Working Hours', value: 'Mon - Fri, 9AM - 6PM' },
//           ].map((item, index) => (
//             <div key={index} className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
//               <span className="text-2xl">{item.icon}</span>
//               <div>
//                 <div className="text-sm text-gray-400">{item.label}</div>
//                 <div className="text-white font-medium">{item.value}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Contact Form */}
//         <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl">
//           {submitted && (
//             <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
//               ✅ Message sent successfully! We'll get back to you soon.
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
//                 placeholder="Your name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
//                 placeholder="your@email.com"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
//               <input
//                 type="text"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
//                 placeholder="How can we help?"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 rows={4}
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
//                 placeholder="Tell us more..."
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact


// src/pages/Contact.jsx
import { useState, useRef } from 'react' // 1. Added useRef
import emailjs from '@emailjs/browser'; // 2. Import EmailJS

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const form = useRef(); // 3. Create a ref for the form

  const handleSubmit = (e) => {
    e.preventDefault();

    // 4. Your EmailJS IDs (Replace these with your actual IDs)
    const serviceId = 'service_8pc729n';
    const templateId = 'template_safbotc';
    const publicKey = 'l1PxYg2N1suQbHMw7';

    // 5. Send the email
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setSubmitted(true);
          setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form state
          setTimeout(() => setSubmitted(false), 3000);
          alert("Mail sent successfully! We'll get back to you soon.");
      }, (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again.");
      });
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Get in{' '}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="text-lg text-gray-400">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            <p className="text-gray-400 mb-8">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
          </div>

          {[
            { icon: '📧', label: 'Email', value: 'contact@utilityhub.com' },
            { icon: '📍', label: 'Location', value: 'Bhilai, India' },
            { icon: '🕐', label: 'Working Hours', value: 'Mon - Fri, 9AM - 6PM' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-sm text-gray-400">{item.label}</div>
                <div className="text-white font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl">
          {submitted && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
              ✅ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {/* 6. Added ref={form} to the form tag */}
          <form ref={form} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Tell us more..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact