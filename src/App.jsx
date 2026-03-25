// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Calculator from './pages/utilities/Calculator'
import CurrencyConverter from './pages/utilities/CurrencyConverter'
import TodoList from './pages/utilities/TodoList'
import PasswordGenerator from './pages/utilities/PasswordGenerator'
import BMICalculator from './pages/utilities/BMICalculator'
import UnitConverter from './pages/utilities/UnitConverter'
import NotePad from './pages/utilities/NotePad'
// import ColorPicker from './pages/utilities/ColorPicker'
// import StopWatch from './pages/utilities/StopWatch'
// import AgeCalculator from './pages/utilities/AgeCalculator'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
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

          <Route path= "utility/unit-converter" element={
            <ProtectedRoute><UnitConverter/></ProtectedRoute>
          }/>
          <Route path="/utility/notepad" element={
            <ProtectedRoute><NotePad /></ProtectedRoute>
          } />
          {/* 
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
          } /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
