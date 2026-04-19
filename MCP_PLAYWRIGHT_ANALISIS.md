# Analisis funcional de PollClass con Playwright

## Estado de despliegue local

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:3000`
- **Login profesor probado:** `profesor / 123456`

## Flujo validado en navegador (automatizado)

Se ejecuto un recorrido E2E en navegador con Playwright y se confirmo:

1. La landing muestra dos entradas: **Profesor** y **Estudiante**.
2. El profesor puede autenticarse y entrar al **Dashboard del Profesor**.
3. El profesor puede crear una encuesta con titulo y opciones.
4. El sistema genera un **codigo de 6 caracteres** (ejemplo observado: `Y4KGQS`).
5. Un estudiante puede unirse con nombre + codigo y votar.
6. Tras votar, aparece confirmacion de voto registrado.
7. El mismo estudiante al volver a entrar queda marcado como **"Ya votaste"** (voto unico aplicado).

## Como funciona la app (resumen)

- **Profesor:** crea y administra encuestas.
- **Estudiante:** entra por codigo, vota una vez y visualiza resultados.
- **Actualizacion en vivo:** la vista de estudiante refresca resultados periodicamente (polling cada 2s).
- **Seguridad:** acciones del profesor usan autenticacion JWT.

## Nota tecnica (Playwright)

El recorrido se automatizo en modo headless para verificar el flujo real UI/API de punta a punta en el navegador.
