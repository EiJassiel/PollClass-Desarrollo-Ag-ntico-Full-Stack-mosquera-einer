export function errorHandler(err, req, res, next) {
  console.error(err.stack)

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  })
}

export function notFound(req, res, next) {
  const error = new Error(`No encontrado - ${req.originalUrl}`)
  res.status(404)
  next(error)
}
