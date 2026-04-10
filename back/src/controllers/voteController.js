import Vote from '../models/Vote.js'
import Poll from '../models/Poll.js'

export async function submitVote(req, res) {
  try {
    const { pollId, studentId, optionIndex } = req.body

    if (!pollId || !studentId || optionIndex === undefined) {
      return res.status(400).json({
        error: 'pollId, studentId y optionIndex son requeridos'
      })
    }

    // Verificar que la encuesta existe y está activa
    const poll = await Poll.findById(pollId)
    if (!poll) {
      return res.status(404).json({ error: 'Encuesta no encontrada' })
    }

    if (!poll.isActive) {
      return res.status(400).json({ error: 'La encuesta ha sido cerrada' })
    }

    // Verificar que el índice de opción es válido
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Opción inválida' })
    }

    // Verificar si el estudiante ya ha votado (índice único en MongoDB lo valida)
    try {
      const vote = new Vote({
        pollId,
        studentId,
        optionIndex
      })

      await vote.save()
      res.status(201).json(vote)
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Ya has votado en esta encuesta' })
      }
      throw error
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function checkUserVoted(req, res) {
  try {
    const { pollId, studentId } = req.params

    const vote = await Vote.findOne({ pollId, studentId })

    res.json({ hasVoted: !!vote })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getPollVotes(req, res) {
  try {
    const { pollId } = req.params

    const votes = await Vote.find({ pollId })

    res.json(votes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
