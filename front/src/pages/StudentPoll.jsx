import { useState, useEffect } from 'react'
import { pollService } from '../services/api'
import ResultsChart from '../components/ResultsChart'
import VoteOptions from '../components/VoteOptions'

export default function StudentPoll({ code, studentId, onLogout }) {
  const [poll, setPoll] = useState(null)
  const [results, setResults] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [voting, setVoting] = useState(false)

  useEffect(() => {
    loadPoll()
    // Polling cada 2 segundos
    const interval = setInterval(loadResults, 2000)
    return () => clearInterval(interval)
  }, [code])

  const loadPoll = async () => {
    try {
      const response = await pollService.getPollByCode(code)
      setPoll(response.data)
      checkIfVoted(response.data._id)
      loadResults(response.data._id)
    } catch (error) {
      setError('No se encontró la encuesta. Verifica el código.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadResults = async (pollId = null) => {
    try {
      const id = pollId || poll?._id
      if (id) {
        const response = await pollService.getPollResults(id)
        setResults(response.data)
      }
    } catch (error) {
      console.error('Error cargando resultados:', error)
    }
  }

  const checkIfVoted = async (pollId) => {
    try {
      const response = await pollService.checkUserVoted(pollId, studentId)
      if (response.data.hasVoted) {
        setHasVoted(true)
      }
    } catch (error) {
      console.error('Error verificando voto:', error)
    }
  }

  const handleVote = async (optionIndex) => {
    if (hasVoted) {
      alert('Ya has votado en esta encuesta')
      return
    }

    setVoting(true)
    try {
      await pollService.vote({
        pollId: poll._id,
        studentId: studentId,
        optionIndex: optionIndex
      })
      setHasVoted(true)
      await loadResults()
    } catch (error) {
      console.error('Error votando:', error)
      alert('Error al registrar tu voto')
    } finally {
      setVoting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl mb-4">⏳</div>
          <p className="font-black text-2xl">Cargando encuesta...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-lg font-black mb-4">{error}</p>
          <button className="btn-outline w-full" onClick={onLogout}>
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pain-bg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black">
              {poll?.title}
            </h1>
            <p className="font-black mt-1">
              Encuesta activa • Código: <span className="font-mono bg-[#00f5ff] border-2 border-black px-2 py-1">{code}</span>
            </p>
          </div>
          <button className="btn-danger" onClick={onLogout}>
            Salir
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card bg-[#f97316]">
              <h2 className="text-xl font-black mb-4">
                {hasVoted ? '✓ Ya votaste' : 'Vota ahora'}
              </h2>
              
              {poll?.isActive ? (
                <VoteOptions
                  options={poll.options}
                  onVote={handleVote}
                  disabled={hasVoted || voting || !poll.isActive}
                  voted={hasVoted}
                />
              ) : (
                <div className="p-4 text-center font-bold bg-[#ffe066] border-2 border-black">
                  <p>Esta encuesta ha sido cerrada</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card bg-[#00f5ff]">
              <h2 className="text-xl font-black mb-4">
                Resultados en Vivo
              </h2>
              {results ? (
                <ResultsChart results={results} options={poll.options} />
              ) : (
                <div className="text-center py-12 font-black">
                  Cargando resultados...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#ff00a8] border-4 border-black shadow-[8px_8px_0_#000] text-sm font-black">
          <p>💡 Tip: Los resultados se actualizan automáticamente cada 2 segundos</p>
        </div>
      </div>
    </div>
  )
}
