# PollClass Development Instructions

## Project Overview
PollClass es una aplicación full stack para encuestas en vivo con dos tipos de usuarios: profesores y estudiantes.

## Stack Requerido
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Bun.js + Express + MongoDB
- **Patrón**: Monorepo con carpetas `/front` y `/back`

## Instrucciones de Desarrollo

### Frontend (React + Vite)
- Usar componentes funcionales con hooks
- Context API para estado global (usuario, encuesta actual)
- Polling cada 2 segundos para obtener resultados
- Tailwind CSS para estilos
- Componentes reutilizables

### Backend (Bun + Express)
- API RESTful con endpoints para polls y votes
- Modelos Mongoose para Poll y Vote
- Validación de código único
- Validación de voto único por estudiante
- CORS habilitado para comunicación con frontend

### Base de Datos
Entidades:
- **Poll**: { _id, title, options, code, isActive, createdAt, closedAt }
- **Vote**: { _id, pollId, studentId, optionIndex, timestamp }

## Endpoints Principales

### Polls
- POST /api/polls - Crear encuesta (profesor)
- GET /api/polls/:code - Obtener encuesta por código
- GET /api/polls/:id/results - Obtener resultados
- PUT /api/polls/:id/close - Cerrar encuesta
- DELETE /api/polls/:id - Eliminar encuesta

### Votes
- POST /api/votes - Registrar voto
- GET /api/polls/:pollId/votes - Obtener votos de una encuesta

## Validaciones Críticas
- Un voto por estudiante por encuesta
- Código generado automáticamente (6 caracteres)
- Encuesta activa requerida para votar
- Diseño responsive obligatorio
