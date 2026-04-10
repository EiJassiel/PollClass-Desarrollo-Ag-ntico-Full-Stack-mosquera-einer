import { useState } from 'react'

export default function PollForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAddOption = () => {
    setOptions([...options, ''])
  }

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Por favor ingresa un título')
      return
    }

    if (options.some(opt => !opt.trim())) {
      setError('Por favor completa todas las opciones')
      return
    }

    if (options.length < 2) {
      setError('Debe haber al menos 2 opciones')
      return
    }

    setLoading(true)
    try {
      await onSubmit({
        title: title.trim(),
        options: options.map(opt => opt.trim())
      })
      setTitle('')
      setOptions(['', ''])
    } catch {
      setError('Error al crear la encuesta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card bg-[#ffe066]">
      <h2 className="text-3xl font-black mb-6">Nueva Encuesta</h2>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 border-2 border-black bg-[#ff00a8] text-black text-sm font-black">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-black mb-2 uppercase">
            Título de la Encuesta
          </label>
          <input
            type="text"
            className="input"
            placeholder="Ej: ¿Cuál es tu lenguaje de programación favorito?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-black mb-3 uppercase">
            Opciones de Respuesta
          </label>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder={`Opción ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveOption(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn-outline w-full mb-6"
          onClick={handleAddOption}
        >
          + Agregar Opción
        </button>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Encuesta'}
        </button>
      </form>
    </div>
  )
}
