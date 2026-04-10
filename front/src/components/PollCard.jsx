import { useState, useEffect } from 'react'
import { pollService } from '../services/api'

export default function PollCard({ poll, onDelete, onClose, isTeacher }) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    if (isTeacher) {
      loadResults()
    }
  }, [poll._id, isTeacher])

  const loadResults = async () => {
    try {
      const response = await pollService.getPollResults(poll._id)
      setResults(response.data)
    } catch (error) {
      console.error('Error cargando resultados:', error)
    }
  }

  const totalVotes = results?.votes?.reduce((sum, v) => sum + v.count, 0) || 0
  const maxVotes = results?.votes ? Math.max(...results.votes.map(v => v.count), 1) : 1

  return (
    <div className={`card ${!poll.isActive ? 'opacity-75' : ''} ${poll.isActive ? 'bg-[#00f5ff]' : 'bg-[#fca5a5]'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-black mb-1">{poll.title}</h3>
          <p className="text-sm font-bold">
            Código: <span className="font-mono bg-[#f9f236] border-2 border-black px-2 py-0.5">{poll.code}</span>
          </p>
        </div>
        <span className={`status-chip px-3 py-1 text-xs font-black ${
          poll.isActive 
            ? 'bg-[#00ff7f]' 
            : 'bg-[#ff3b30]'
        }`}>
          {poll.isActive ? '● En vivo' : '● Cerrada'}
        </span>
      </div>

      {isTeacher && results && (
        <div className="mb-4 space-y-2">
          {poll.options.map((option, index) => (
            <div key={index} className="text-sm font-bold">
              <div className="flex justify-between mb-1">
                <span>{option}</span>
                <span>{results.votes[index]?.count || 0}</span>
              </div>
              <div className="w-full bg-black h-3 border-2 border-black">
                <div
                  className="bg-[#ff00a8] h-full"
                  style={{
                    width: `${totalVotes > 0 ? ((results.votes[index]?.count || 0) / maxVotes) * 100 : 0}%`
                  }}
                />
              </div>
            </div>
          ))}
          <div className="pt-2 text-right text-xs font-black">
            Total: <strong>{totalVotes}</strong> votos
          </div>
        </div>
      )}

      {isTeacher && (
        <div className="flex gap-2 pt-4 border-t-4 border-black">
          {poll.isActive && (
            <button
              className="flex-1 btn-danger text-sm"
              onClick={onClose}
            >
              Cerrar
            </button>
          )}
          <button
            className="flex-1 btn-danger text-sm opacity-60 hover:opacity-100"
            onClick={onDelete}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  )
}
