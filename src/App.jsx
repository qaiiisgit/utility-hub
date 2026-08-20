// src/App.jsx
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Core Pages (Lazy Loaded)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// import LandingPage from './pages/LandingPage'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Dashboard from './pages/Dashboard'

// Utility Pages (Lazy Loaded)
const Calculator = lazy(() => import('./pages/utilities/Calculator'));
const CurrencyConverter = lazy(() => import('./pages/utilities/CurrencyConverter'))
const TodoList = lazy(() => import('./pages/utilities/TodoList'))
const PasswordGenerator = lazy(() => import('./pages/utilities/PasswordGenerator'))
const BMICalculator = lazy(() => import('./pages/utilities/BMICalculator'))
const UnitConverter = lazy(() => import('./pages/utilities/UnitConverter'))
const NotePad = lazy(() => import('./pages/utilities/NotePad'))
const ColorPicker = lazy(() => import('./pages/utilities/ColorPicker'))
const StopWatch = lazy(() => import('./pages/utilities/StopWatch'))
const AgeCalculator = lazy(() => import('./pages/utilities/AgeCalculator'))


// import Calculator from './pages/utilities/Calculator'
// import CurrencyConverter from './pages/utilities/CurrencyConverter'
// import TodoList from './pages/utilities/TodoList'
// import PasswordGenerator from './pages/utilities/PasswordGenerator'
// import BMICalculator from './pages/utilities/BMICalculator'
// import UnitConverter from './pages/utilities/UnitConverter'
// import NotePad from './pages/utilities/NotePad'
// import ColorPicker from './pages/utilities/ColorPicker'
// import StopWatch from './pages/utilities/StopWatch'
// import AgeCalculator from './pages/utilities/AgeCalculator'

// const PageLoader = () => (
//   <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
//     <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
//     <p className="text-gray-400 text-sm font-medium tracking-wide">Loading component...</p>
//   </div>
// )

const PageLoader = () => (
  <div className='flex flex-col items-center justify-center min-h-[60vh] gap-3'>
    <div className='w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin' />
    <p className='text-gray-400 text-sm font-medium tracking-wide'>Loading componenet...</p>
  </div>
)

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/utility/calculator" element={
              <ProtectedRoute><Calculator /></ProtectedRoute>
            } />
            <Route path="/utility/currency-converter" element={
              <ProtectedRoute><CurrencyConverter /></ProtectedRoute>
            } />
            <Route path="/utility/todo-list" element={
              <ProtectedRoute><TodoList /></ProtectedRoute>
            } />
            <Route path="/utility/password-generator" element={
              <ProtectedRoute><PasswordGenerator /></ProtectedRoute>
            } />

            <Route path="/utility/bmi-calculator" element={
              <ProtectedRoute><BMICalculator /></ProtectedRoute>
            }></Route>

            <Route path="utility/unit-converter" element={
              <ProtectedRoute><UnitConverter /></ProtectedRoute>
            } />
            <Route path="/utility/notepad" element={
              <ProtectedRoute><NotePad /></ProtectedRoute>
            } />
            <Route path="/utility/color-picker" element={
              <ProtectedRoute><ColorPicker /></ProtectedRoute>
            } />
            <Route path="/utility/stopwatch" element={
              <ProtectedRoute><StopWatch /></ProtectedRoute>
            } />

            <Route path="/utility/age-calculator" element={
              <ProtectedRoute><AgeCalculator /></ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
