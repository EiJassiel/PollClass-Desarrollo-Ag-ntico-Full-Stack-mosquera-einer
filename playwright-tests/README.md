# Playwright Tests - PollClass

Suite de pruebas end-to-end para el laboratorio 5 de PollClass.

## Requisitos

- Node.js 18+
- Bun (para el backend)
- npm o bun

## Instalación

```bash
cd playwright-tests
npm install
npx playwright install chromium
```

## Ejecutar Pruebas

```bash
npm test
```

## Estructura

```
playwright-tests/
├── tests/
│   └── poll.spec.js       # 10 pruebas E2E + API
├── playwright.config.js   # Configuración
├── package.json           # Dependencias
├── README.md              # Este archivo
├── TESTING.md             # Documentación de pruebas
├── BITACORA.md            # Bitácora agéntica
└── execution-output.txt   # Captura de ejecución
```

## Ejecución

```
> npm test
Running 10 tests using 8 workers
  10 passed (6.4s)
```

Ver archivo `execution-output.txt` para la captura completa de ejecución.

## Pruebas Incluidas

| # | Prueba | Tipo |
|---|-------|------|
| 1 | Landing muestra opciones de Profesor y Estudiante | E2E |
| 2 | Login de profesor con credenciales válidas | E2E |
| 3 | Crear nueva encuesta desde dashboard | E2E |
| 4 | Estudiante se une a encuesta con código | E2E |
| 5 | Login con credenciales incorrectas | Negativo |
| 6 | Crear encuesta sin título muestra error | Negativo |
| 7 | Estudiante sin completar campos | Negativo |
| 8 | Health check del backend responde | API |
| 9 | API login retorna token con credenciales válidas | API |
| 10 | API login retorna 401 con password incorrecto | Negativo |

**Total: 10 pruebas pasando (100%)**

## Configuración

Los servidores (backend y frontend) se inician automáticamente gracias a la configuración `webServer` en `playwright.config.js`.

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Créditos

Desarrollado con asistencia agéntica para el laboratorio 5.