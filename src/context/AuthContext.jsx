// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('utilityHub_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('utilityHub_users') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)

    if (foundUser) {
      const userData = { name: foundUser.name, email: foundUser.email }
      setUser(userData)
      localStorage.setItem('utilityHub_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password' }
  }

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('utilityHub_users') || '[]')
    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
      return { success: false, message: 'User already exists with this email' }
    }

    users.push({ name, email, password })
    localStorage.setItem('utilityHub_users', JSON.stringify(users))

    const userData = { name, email }
    setUser(userData)
    localStorage.setItem('utilityHub_user', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('utilityHub_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}