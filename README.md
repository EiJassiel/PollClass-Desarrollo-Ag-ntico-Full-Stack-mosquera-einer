# PollClass

Plataforma de encuestas en tiempo real para clases.

## Capturas de Pantalla

### Landing
![Landing](front/assets/landing.png)

### Vista Profesor
![Vista Profesor](front/assets/pantalla-profesor.png)

### Vista Estudiante
![Vista Estudiante](front/assets/pantalla-estudiante.png)

### Proceso Agéntico con OpenCode
![OpenCode](front/assets/opencode.png)

---

## Requisitos Previos

- Node.js 18+ o Bun 1.0+
- MongoDB 4.4+ (o usar modo en memoria)

## Instalación y Ejecución

### 1. Backend

```bash
cd back
bun install
bun run dev
```

El backend estará disponible en `http://localhost:3000`

**Credenciales por defecto:**
- Usuario: `profesor`
- Contraseña: `123456`

**Modo sin MongoDB:**
Si no tienes MongoDB instalado o Atlas te bloquea, agrega `USE_IN_MEMORY_MONGO=true` en el archivo `.env`.

### 2. Frontend

```bash
cd front
bun install
bun run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
PollClass/
├── back/           # API REST (Express + MongoDB)
│   ├── src/
│   │   ├── models/      # Modelos de datos
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── routes/      # Endpoints API
│   │   ├── middleware/  # Middleware
│   │   └── server.js    # Punto de entrada
│   └── README.md
├── front/          # Aplicación React
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/       # Vistas principales
│   │   ├── context/     # Estado global
│   │   └── services/    # Llamadas API
│   ├── assets/          # Imágenes y recursos
│   └── README.md
└── README.md
```

## Características

- **Tiempo real:** Resultados actualizados cada 2 segundos
- **Voto único:** Cada estudiante solo puede votar una vez
- **Códigos de acceso:** Los profesores generan códigos únicos para cada encuesta
- **Diseño responsive:** Funciona en desktop y móvil
- **Gráficos interactivos:** Visualización de resultados con Recharts

## Flujo de Uso

1. El profesor inicia sesión
2. Crea una nueva encuesta con opciones
3. Comparte el código con los estudiantes
4. Los estudiantes ingresan su nombre y el código
5. Votan y ven los resultados en tiempo real
