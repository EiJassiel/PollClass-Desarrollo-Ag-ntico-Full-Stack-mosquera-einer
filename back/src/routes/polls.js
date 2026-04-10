import express from 'express'
import * as pollController from '../controllers/pollController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

// GET /api/polls - Obtener todas las encuestas
router.get('/', requireAuth, pollController.getAllPolls)

// POST /api/polls - Crear nueva encuesta
router.post('/', requireAuth, pollController.createPoll)

// GET /api/polls/code/:code - Obtener encuesta por código
router.get('/code/:code', pollController.getPollByCode)

// GET /api/polls/:id - Obtener encuesta por ID
router.get('/:id', requireAuth, pollController.getPollById)

// GET /api/polls/:id/results - Obtener resultados
router.get('/:id/results', pollController.getPollResults)

// PUT /api/polls/:id/close - Cerrar encuesta
router.put('/:id/close', requireAuth, pollController.closePoll)

// DELETE /api/polls/:id - Eliminar encuesta
router.delete('/:id', requireAuth, pollController.deletePoll)

export default router
