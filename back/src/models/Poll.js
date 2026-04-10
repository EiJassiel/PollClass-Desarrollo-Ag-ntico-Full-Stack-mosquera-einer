import mongoose from 'mongoose'

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    options: [{
      type: String,
      required: true
    }],
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      length: 6
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    closedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
)

export default mongoose.model('Poll', pollSchema)
