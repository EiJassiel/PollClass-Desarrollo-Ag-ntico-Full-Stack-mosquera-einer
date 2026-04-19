# Bitácora Agéntica - Laboratorio 5 con Playwright

## Qué pedí al agente
- Implementar suite de pruebas Playwright para el laboratorio 5
- Validar al menos 3 flujos críticos de extremo a extremo
- Incluir al menos 1 caso negativo/de validación
- Ejecutar suite completa y corregir lo bloqueante
- Documentar cómo ejecutar las pruebas

## Qué acepté del agente
- Análisis de la estructura del proyecto (backend con Express, frontend con React)
- Creación de suite con 10 pruebas divididas en E2E y API
- Configuración de playwright.config.js con webServer para auto-iniciar servicios
- Documentación de pruebas en TESTING.md

## Qué corregí yo
- Las pruebas iniciales usaban locators incorrectos que no correspondían a la UI real
- Corríg los locators de formulario para usar getByRole() y selectors nth()
- Eliminé el archivo poll-full.spec.js obsoleto y consolidé en poll.spec.js
- Configuré correctamente el webServer para iniciar tanto backend como frontend
- Las pruebas de API now usan credenciales correctas del .env (profesor/123456)

## Cómo validé
- Ejecuté `npm test` - 10/10 pruebas pasando
- Las pruebas E2E validan navegación真实的 y flujos de usuario
- Los casos negativos verifican mensajes de error reales
- Las pruebas de API verifican endpoints funcionando

## Flujos Validados
1. Landing → Login Profesor → Dashboard (autenticación completa)
2. Dashboard → Crear Encuesta (formulario con validación)
3. Landing → Unirse como Estudiante (con código inválido)
4. Casos negativos: credenciales incorrectas, campos vacíos, título faltante

## Estado Final
- **10/10 pruebas pasando (100%)**
- E2E Frontend: 7 pruebas ✅
- API Backend: 3 pruebas ✅
- Suite lista para siguientes entregas