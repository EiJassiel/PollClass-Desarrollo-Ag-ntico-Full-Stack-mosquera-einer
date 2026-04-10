import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'pollclass-dev-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h'

export async function loginTeacher(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'username y password son requeridos' })
  }

  const expectedUsername = process.env.TEACHER_USERNAME || 'profesor'
  const expectedPassword = process.env.TEACHER_PASSWORD || '123456'

  if (username !== expectedUsername || password !== expectedPassword) {
    return res.status(401).json({ error: 'Credenciales inválidas' })
  }

  const user = {
    username: expectedUsername,
    role: 'teacher'
  }

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

  return res.json({
    token,
    user
  })
}

