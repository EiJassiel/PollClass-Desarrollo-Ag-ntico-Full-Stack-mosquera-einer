# PollClass - Documentación Técnica

## Arquitectura

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│   MongoDB    │
│  React/Vite  │     │   Express    │     │   Atlas      │
│  Puerto:5173 │     │  Puerto:3000 │     │  (Cloud)     │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Puertos de Servicios

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Frontend | 5173   | Interfaz de usuario (Vite) |
| Backend | 3000  | API REST (Express + CORS) |
| MongoDB | 27017 | Base de datos MongoDB Atlas (Cloud) |

## Base de Datos

**Motor**: MongoDB via Mongoose ODM

**Conexión**: MongoDB Atlas en la nube
```
MONGODB_URI=mongodb+srv://einermosquera_db_user:***@poll-software.knvfjqj.mongodb.net/poll-software
```

### Colecciones

**Poll** (Encuestas)
- title: String - Título
- options: String[] - Opciones de respuesta
- code: String - Código único (6 letras, mayúsculas)
- isActive: Boolean - Estado activo/cerrado
- createdAt / closedAt: Date

**Vote** (Votos)
- pollId: ObjectId - Referencia a Poll
- studentId: String - ID del estudiante
- optionIndex: Number - Índice de opción elegida
- timestamp: Date
- Índice único: un voto por estudiante por encuesta

## Comunicación Frontend ↔ Backend

**Protocolo**: REST API sobre HTTP

**Autenticación**: JWT (JSON Web Token)
- Secret: `pollclass-super-secret`
- Expiración: 8h

### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/auth/login | Login profesor |
| GET | /api/polls | Listar encuestas |
| POST | /api/polls | Crear encuesta |
| GET | /api/polls/:code | Ver encuesta |
| POST | /api/votes | Registrar voto |
| GET | /api/polls/:code/votes | Ver resultados |

## Credenciales

- Usuario: **profesor**
- Password: **123456**

## Ejecución

```bash
# Backend
cd back && npm run dev    # Puerto 3000

# Frontend  
cd front && npm run dev   # Puerto 5173
```