import { createContext, useContext, useMemo, useState } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext()

const TOKEN_KEY = 'pollclass_token'
const USER_KEY = 'pollclass_user'

function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(getStoredUser())

  const login = async (username, password) => {
    const response = await authService.login({ username, password })
    const nextToken = response.data.token
    const nextUser = response.data.user

    localStorage.setItem(TOKEN_KEY, nextToken)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    setToken(nextToken)
    setUser(nextUser)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    logout
  }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}

