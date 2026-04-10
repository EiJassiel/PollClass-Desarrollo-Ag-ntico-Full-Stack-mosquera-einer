import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pollclass_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const pollService = {
  // Polls
  createPoll: (pollData) => api.post('/polls', pollData),
  getPollByCode: (code) => api.get(`/polls/code/${code}`),
  getPollResults: (pollId) => api.get(`/polls/${pollId}/results`),
  closePoll: (pollId) => api.put(`/polls/${pollId}/close`),
  deletePoll: (pollId) => api.delete(`/polls/${pollId}`),
  getAllPolls: () => api.get('/polls'),

  // Votes
  vote: (voteData) => api.post('/votes', voteData),
  getPollVotes: (pollId) => api.get(`/votes/${pollId}`),
  checkUserVoted: (pollId, studentId) => api.get(`/votes/${pollId}/${studentId}`),
}

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
}

export default api
