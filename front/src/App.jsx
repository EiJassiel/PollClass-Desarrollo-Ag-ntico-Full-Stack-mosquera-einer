import { useState } from 'react'
import { PollProvider } from './context/PollContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentPoll from './pages/StudentPoll'
import TeacherLogin from './pages/TeacherLogin'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <PollProvider>
        <AppContent />
      </PollProvider>
    </AuthProvider>
  )
}

function AppContent() {
  const { isAuthenticated, logout } = useAuth()
  const [view, setView] = useState('landing') // 'landing', 'teacher', 'student'
  const [studentId, setStudentId] = useState(null)
  const [pollCode, setPollCode] = useState(null)

  const handleTeacherClick = () => {
    setView(isAuthenticated ? 'teacher' : 'teacher-login')
  }

  const handleStudentClick = () => {
    setView('student-entry')
  }

  const handleStudentJoinPoll = (code, id) => {
    setPollCode(code)
    setStudentId(id)
    setView('student')
  }

  return (
    <div className="min-h-screen pain-bg">
      {view === 'landing' && (
        <Landing
          onTeacherClick={handleTeacherClick}
          onStudentClick={handleStudentClick}
        />
      )}
      {view === 'teacher-login' && (
        <TeacherLogin
          onBack={() => setView('landing')}
          onSuccess={() => setView('teacher')}
        />
      )}
      {view === 'teacher' && (
        <TeacherDashboard
          onLogout={() => {
            logout()
            setView('landing')
          }}
        />
      )}
      {view === 'student-entry' && (
        <StudentEntry
          onJoin={handleStudentJoinPoll}
          onBack={() => setView('landing')}
        />
      )}
      {view === 'student' && (
        <StudentPoll
          code={pollCode}
          studentId={studentId}
          onLogout={() => setView('landing')}
        />
      )}
    </div>
  )
}

function StudentEntry({ onJoin, onBack }) {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleJoin = () => {
    if (!code.trim() || !name.trim()) {
      setError('Por favor completa todos los campos')
      return
    }
    onJoin(code.toUpperCase(), name)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="card max-w-md w-full">
        <h2 className="text-3xl font-black mb-6 text-center">
          Unirse a una Encuesta
        </h2>
        
        {error && (
          <div className="mb-4 p-3 border-2 border-black bg-[#ff00a8] text-black text-sm font-bold">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-black mb-1 uppercase">
              Tu Nombre
            </label>
            <input
              type="text"
              className="input"
              placeholder="Ej: Juan García"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-1 uppercase">
              Código de Encuesta
            </label>
            <input
              type="text"
              className="input uppercase"
              placeholder="Ej: AB12CD"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
          </div>

          <div className="pt-4 space-y-2">
            <button className="btn-primary w-full" onClick={handleJoin}>
              Unirse a Encuesta
            </button>
            <button className="btn-outline w-full" onClick={onBack}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
