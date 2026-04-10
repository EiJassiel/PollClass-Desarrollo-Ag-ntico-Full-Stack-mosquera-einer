import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function TeacherLogin({ onBack, onSuccess }) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Completa usuario y contraseña')
      return
    }

    try {
      setLoading(true)
      await login(username.trim(), password)
      onSuccess()
    } catch (err) {
      setError(err?.response?.data?.error || 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="card max-w-md w-full bg-[#00f5ff]">
        <h2 className="text-3xl font-black mb-6 text-center">Login Profesor</h2>

        {error && (
          <div className="mb-4 p-3 border-2 border-black bg-[#ff00a8] text-black text-sm font-bold">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-black mb-1 uppercase">Usuario</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-1 uppercase">Contraseña</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="pt-4 space-y-2">
            <button className="btn-primary w-full" type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Entrar'}
            </button>
            <button className="btn-outline w-full" type="button" onClick={onBack}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

