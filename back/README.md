# PollClass - README Backend

## Estructura

```
back/
├── src/
│   ├── models/           # Modelos MongoDB
│   │   ├── Poll.js       # Modelo de encuesta
│   │   └── Vote.js       # Modelo de voto
│   ├── controllers/      # Controladores (lógica de negocio)
│   │   ├── pollController.js
│   │   └── voteController.js
│   ├── routes/           # Rutas API
│   │   ├── polls.js
│   │   └── votes.js
│   ├── middleware/       # Middleware
│   │   └── errorHandler.js
│   └── server.js         # Archivo principal
├── .env                  # Variables de entorno
└── package.json
```

## Requisitos Previos

- Node.js 18+ o Bun 1.0+
- MongoDB 4.4+

## Instalación

```bash
cd back
bun install
```

## Variables de Entorno (.env)

```
MONGODB_URI=mongodb://localhost:27017/pollclass
USE_IN_MEMORY_MONGO=false
PORT=3000
NODE_ENV=development
JWT_SECRET=pollclass-super-secret
JWT_EXPIRES_IN=8h
TEACHER_USERNAME=profesor
TEACHER_PASSWORD=123456
```

> Si Atlas te bloquea por IP o no tienes MongoDB instalado, usa `USE_IN_MEMORY_MONGO=true` para levantar una base Mongo temporal en memoria durante desarrollo.

## Ejecutar en Desarrollo

```bash
bun run dev
```

El servidor estará disponible en `http://localhost:3000`

## API Endpoints

### Auth
- `POST /api/auth/login` - Login de profesor
  ```json
  {
    "username": "profesor",
    "password": "123456"
  }
  ```

### Polls
- `POST /api/polls` - Crear encuesta (**requiere Bearer token**)
  ```json
  {
    "title": "¿Cuál es tu lenguaje favorito?",
    "options": ["JavaScript", "Python", "Java", "C++"]
  }
  ```

- `GET /api/polls` - Obtener todas las encuestas (**requiere Bearer token**)

- `GET /api/polls/:id` - Obtener encuesta por ID (**requiere Bearer token**)

- `GET /api/polls/code/:code` - Obtener encuesta por código

- `GET /api/polls/:id/results` - Obtener resultados

- `PUT /api/polls/:id/close` - Cerrar encuesta (**requiere Bearer token**)

- `DELETE /api/polls/:id` - Eliminar encuesta (**requiere Bearer token**)

### Votes
- `POST /api/votes` - Registrar voto
  ```json
  {
    "pollId": "...",
    "studentId": "estudiante1",
    "optionIndex": 0
  }
  ```

- `GET /api/votes/:pollId/:studentId` - Verificar si votó

- `GET /api/votes/:pollId` - Obtener votos de una encuesta

## Características

- ✅ API RESTful
- ✅ CORS habilitado
- ✅ Validación de voto único por estudiante
- ✅ Generación automática de códigos
- ✅ Manejo de errores centralizado
- ✅ Índices de BD optimizados
