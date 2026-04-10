import express from 'express'
import * as voteController from '../controllers/voteController.js'

const router = express.Router()

// POST /api/votes - Registrar voto
router.post('/', voteController.submitVote)

// GET /api/votes/:pollId/:studentId - Verificar si el estudiante ya votó
router.get('/:pollId/:studentId', voteController.checkUserVoted)

// GET /api/votes/:pollId - Obtener votos de una encuesta
router.get('/:pollId', voteController.getPollVotes)

export default router
