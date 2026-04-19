# Suite de Pruebas Playwright - PollClass (Laboratorio 5)

## Instalación

```bash
npm install
npx playwright install chromium
```

## Cómo Ejecutar las Pruebas

### Requisitos previos
Las pruebas iniciarán automáticamente los servidores (configurado en playwright.config.js).

### Ejecutar pruebas

```bash
# Todas las pruebas
npm test

# Con interfaz visual
npm run test:ui

# Ver reporte HTML
npm run test:report
```

## Flujos Críticos Validados (Laboratorio 5)

### 1. Landing muestra opciones de Profesor y Estudiante
Verifica que la landing carga correctamente con las opciones de usuario.

### 2. Login de profesor con credenciales válidas
Valida flujo completo de autenticación de profesor.

### 3. Crear nueva encuesta desde dashboard
Valida creación de encuesta con título y opciones.

### 4. Estudiante se une a encuesta con código
Valida flujo de estudiante para unirse a encuesta.

### 5. Caso negativo: Login con credenciales incorrectas
Valida mensaje de error con password incorrecto.

### 6. Caso negativo: Crear encuesta sin título muestra error
Valida validación del formulario de encuesta.

### 7. Caso negativo: Estudiante sin completar campos
Valida validación de formulario de entrada de estudiante.

### Pruebas de API (Backend)

### 8. Health check del backend responde
Verifica que el endpoint /health responde correctamente.

### 9. API login retorna token con credenciales válidas
Valida autenticación vía API.

### 10. Caso negativo: API login retorna 401 con password incorrecto
Valida respuesta de error de la API.

## Estructura de Archivos

```
PollClass/
├── tests/
│   └── poll.spec.js        # Suite completa (10 pruebas)
├── playwright.config.js  # Configuración de Playwright
└── package.json
```

## Resultados

| Suite | Pruebas | Estado |
|-------|---------|--------|
| Frontend E2E | 7 | ✅ Todas pasando |
| API Backend | 3 | ✅ Todas pasando |
| **Total** | 10 | **10/10 passing** |

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecutar suite completa |
| `npm run test:ui` | Ejecutar con interfaz visual |
| `npm run test:report` | Ver reporte HTML |

## Tecnologías

- **Playwright** v1.50.0
- **Chromium** (navegador)
- **Bun** (backend)
- **Vite** (frontend)