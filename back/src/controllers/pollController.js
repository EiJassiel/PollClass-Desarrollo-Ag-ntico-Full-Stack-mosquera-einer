import Poll from '../models/Poll.js'
import Vote from '../models/Vote.js'

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function createPoll(req, res) {
  try {
    const { title, options } = req.body

    if (!title || !options || options.length < 2) {
      return res.status(400).json({
        error: 'Título y al menos 2 opciones son requeridas'
      })
    }

    let code
    let exists = true
    while (exists) {
      code = generateCode()
      exists = await Poll.findOne({ code })
    }

    const poll = new Poll({
      title,
      options,
      code
    })

    await poll.save()
    res.status(201).json(poll)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getAllPolls(req, res) {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 })
    res.json(polls)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getPollByCode(req, res) {
  try {
    const { code } = req.params
    const poll = await Poll.findOne({ code: code.toUpperCase() })

    if (!poll) {
      return res.status(404).json({ error: 'Encuesta no encontrada' })
    }

    res.json(poll)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getPollById(req, res) {
  try {
    const { id } = req.params
    const poll = await Poll.findById(id)

    if (!poll) {
      return res.status(404).json({ error: 'Encuesta no encontrada' })
    }

    res.json(poll)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function closePoll(req, res) {
  try {
    const { id } = req.params
    const poll = await Poll.findByIdAndUpdate(
      id,
      { isActive: false, closedAt: new Date() },
      { new: true }
    )

    if (!poll) {
      return res.status(404).json({ error: 'Encuesta no encontrada' })
    }

    res.json(poll)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deletePoll(req, res) {
  try {
    const { id } = req.params
    
    await Poll.findByIdAndDelete(id)
    await Vote.deleteMany({ pollId: id })

    res.json({ message: 'Encuesta eliminada' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getPollResults(req, res) {
  try {
    const { id } = req.params
    const poll = await Poll.findById(id)

    if (!poll) {
      return res.status(404).json({ error: 'Encuesta no encontrada' })
    }

    const votes = await Vote.aggregate([
      { $match: { pollId: poll._id } },
      { $group: { _id: '$optionIndex', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])

    const votesByOption = poll.options.map((_, index) => {
      const voteData = votes.find(v => v._id === index)
      return { count: voteData?.count || 0 }
    })

    res.json({
      pollId: poll._id,
      title: poll.title,
      options: poll.options,
      votes: votesByOption,
      totalVotes: votes.reduce((sum, v) => sum + v.count, 0)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
