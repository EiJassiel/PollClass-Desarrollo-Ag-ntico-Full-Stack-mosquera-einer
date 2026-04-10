import { createContext, useContext, useState } from 'react'

const PollContext = createContext()

export function PollProvider({ children }) {
  const [currentPoll, setCurrentPoll] = useState(null)
  const [polls, setPolls] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)

  const createPoll = (poll) => {
    setPolls([...polls, poll])
    return poll
  }

  const updatePoll = (pollId, updates) => {
    setPolls(polls.map(p => p._id === pollId ? { ...p, ...updates } : p))
  }

  const deletePoll = (pollId) => {
    setPolls(polls.filter(p => p._id !== pollId))
  }

  return (
    <PollContext.Provider value={{
      currentPoll,
      setCurrentPoll,
      polls,
      setPolls,
      selectedOption,
      setSelectedOption,
      createPoll,
      updatePoll,
      deletePoll
    }}>
      {children}
    </PollContext.Provider>
  )
}

export function usePoll() {
  const context = useContext(PollContext)
  if (!context) {
    throw new Error('usePoll debe ser usado dentro de PollProvider')
  }
  return context
}
