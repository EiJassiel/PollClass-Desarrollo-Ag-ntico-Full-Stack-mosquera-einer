import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import 'dotenv/config'
import pollRoutes from './routes/polls.js'
import voteRoutes from './routes/votes.js'
import authRoutes from './routes/auth.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000
const useInMemoryMongo = process.env.USE_IN_MEMORY_MONGO === 'true'
let memoryMongoServer = null

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/polls', pollRoutes)
app.use('/api/votes', voteRoutes)

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

// Error Handling
app.use(notFound)
app.use(errorHandler)

async function getMongoUri() {
  if (useInMemoryMongo) {
    memoryMongoServer = await MongoMemoryServer.create()
    const uri = memoryMongoServer.getUri('pollclass')
    console.log('🧪 MongoDB en memoria habilitado (USE_IN_MEMORY_MONGO=true)')
    return uri
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      'MONGODB_URI no está configurada. Define MONGODB_URI o usa USE_IN_MEMORY_MONGO=true.'
    )
  }

  return process.env.MONGODB_URI
}

async function startServer() {
  try {
    const mongoUri = await getMongoUri()
    await mongoose.connect(mongoUri)
    console.log('✅ MongoDB conectado')

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
      console.log('📊 PollClass Backend - Modo desarrollo')
    })
  } catch (err) {
    console.error('❌ Error conectando MongoDB:', err.message)
    process.exit(1)
  }
}

async function shutdown() {
  await mongoose.disconnect()
  if (memoryMongoServer) {
    await memoryMongoServer.stop()
  }
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

startServer()
