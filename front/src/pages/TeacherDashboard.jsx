import { useState, useEffect } from 'react'
import { pollService } from '../services/api'
import PollForm from '../components/PollForm'
import PollCard from '../components/PollCard'

export default function TeacherDashboard({ onLogout }) {
  const [polls, setPolls] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPolls()
  }, [])

  const loadPolls = async () => {
    try {
      setLoading(true)
      const response = await pollService.getAllPolls()
      setPolls(response.data)
    } catch (error) {
      if (error?.response?.status === 401) {
        alert('Sesión expirada. Inicia sesión nuevamente.')
        onLogout()
        return
      }
      console.error('Error cargando encuestas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePoll = async (pollData) => {
    try {
      const response = await pollService.createPoll(pollData)
      setPolls([...polls, response.data])
      setShowForm(false)
    } catch (error) {
      console.error('Error creando encuesta:', error)
      alert('Error al crear la encuesta')
    }
  }

  const handleDeletePoll = async (pollId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) {
      try {
        await pollService.deletePoll(pollId)
        setPolls(polls.filter(p => p._id !== pollId))
      } catch (error) {
        console.error('Error eliminando encuesta:', error)
        alert('Error al eliminar la encuesta')
      }
    }
  }

  const handleClosePoll = async (pollId) => {
    try {
      await pollService.closePoll(pollId)
      setPolls(polls.map(p => p._id === pollId ? { ...p, isActive: false } : p))
    } catch (error) {
      console.error('Error cerrando encuesta:', error)
      alert('Error al cerrar la encuesta')
    }
  }

  return (
    <div className="min-h-screen pain-bg p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black">
              Dashboard del Profesor
            </h1>
            <p className="font-black mt-1">Panel de control extremo en tiempo real</p>
          </div>
          <button
            className="btn-danger"
            onClick={onLogout}
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="mb-8">
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancelar' : '+ Nueva Encuesta'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <PollForm onSubmit={handleCreatePoll} />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 font-black text-2xl">
            Cargando encuestas...
          </div>
        ) : polls.length === 0 ? (
          <div className="card text-center py-12 bg-[#00f5ff]">
            <p className="text-lg mb-4 font-black">
              No hay encuestas aún
            </p>
            <p className="font-bold">
              Crea tu primera encuesta haciendo clic en "Nueva Encuesta"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {polls.map(poll => (
              <PollCard
                key={poll._id}
                poll={poll}
                onDelete={() => handleDeletePoll(poll._id)}
                onClose={() => handleClosePoll(poll._id)}
                isTeacher={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
