# PollClass - Frontend

## Capturas de Pantalla

### Landing Page
![Landing](assets/landing.png)

### Vista del Profesor
![Vista Profesor](assets/pantalla-profesor.png)

### Vista del Estudiante
![Vista Estudiante](assets/pantalla-estudiante.png)

---

## Estructura

```
front/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── PollForm.jsx
│   │   ├── PollCard.jsx
│   │   ├── ResultsChart.jsx
│   │   └── VoteOptions.jsx
│   ├── pages/            # Vistas principales
│   │   ├── Landing.jsx
│   │   ├── TeacherDashboard.jsx
│   │   └── StudentPoll.jsx
│   ├── context/          # Context API
│   │   └── PollContext.jsx
│   ├── services/         # Llamadas API
│   │   └── api.js
│   ├── App.jsx           # Componente principal
│   ├── index.css         # Estilos globales
│   └── main.jsx          # Punto de entrada
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Requisitos Previos

- Node.js 18+ o Bun 1.0+
- Backend corriendo en `http://localhost:3000`

## Instalación

```bash
cd front
bun install
```

## Ejecutar en Desarrollo

```bash
bun run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build para Producción

```bash
bun run build
```

## Características

- ✅ React 18 con Hooks
- ✅ Vite para bundling rápido
- ✅ Tailwind CSS para estilos
- ✅ Context API para estado global
- ✅ Polling para actualización de resultados
- ✅ Diseño responsive
- ✅ Gráficos con Recharts

## Flujos de Usuario

### Profesor
1. Ingresa como profesor
2. Crea una nueva encuesta
3. Comparte el código con estudiantes
4. Ve resultados en tiempo real
5. Puede cerrar o eliminar encuestas

### Estudiante
1. Ingresa nombre
2. Introduce código de encuesta
3. Selecciona una opción para votar
4. Ve resultados actualizándose cada 2 segundos

## Proceso Agéntico con OpenCode

Este proyecto fue desarrollado utilizando **OpenCode**, un asistente de IA que automatiza tareas de ingeniería de software. El agente fue capaz de:

- Crear la estructura del proyecto
- Implementar el backend con Express y MongoDB
- Desarrollar el frontend con React y Tailwind CSS
- Agregar funcionalidades como polling en tiempo real
- Generar documentación y capturas de pantalla

![Proceso Agéntico](assets/opencode.png)
