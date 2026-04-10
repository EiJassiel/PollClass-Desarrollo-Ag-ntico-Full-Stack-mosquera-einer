import mongoose from 'mongoose'

const voteSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      required: true
    },
    studentId: {
      type: String,
      required: true
    },
    optionIndex: {
      type: Number,
      required: true,
      min: 0
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

// Índice único: un voto por estudiante por encuesta
voteSchema.index({ pollId: 1, studentId: 1 }, { unique: true })

export default mongoose.model('Vote', voteSchema)
