import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'
const API_URL = 'http://localhost:3000'

test.describe('PollClass - Laboratorio 5: Suite de Pruebas E2E', () => {

  test('1. Landing muestra opciones de Profesor y Estudiante', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    await expect(page.locator('h1:has-text("PollClass")')).toBeVisible()
    await expect(page.locator('h2:has-text("Profesor")')).toBeVisible()
    await expect(page.locator('h2:has-text("Estudiante")')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entrar como Profesor' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entrar como Estudiante' })).toBeVisible()
  })

  test('2. Login de profesor con credenciales válidas', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    await page.getByRole('button', { name: 'Entrar como Profesor' }).click()
    
    await expect(page.locator('h2:has-text("Login Profesor")')).toBeVisible()
    
    await page.locator('input[autocomplete="username"]').fill('profesor')
    await page.locator('input[autocomplete="current-password"]').fill('123456')
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible({ timeout: 10000 })
  })

  test('3. Crear nueva encuesta desde dashboard', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    await page.getByRole('button', { name: 'Entrar como Profesor' }).click()
    await page.locator('input[autocomplete="username"]').fill('profesor')
    await page.locator('input[autocomplete="current-password"]').fill('123456')
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible({ timeout: 10000 })
    
    await page.getByRole('button', { name: '+ Nueva Encuesta' }).click()
    
    await expect(page.locator('h2:has-text("Nueva Encuesta")')).toBeVisible()
    
    await page.locator('input').nth(0).fill('Encuesta de Prueba Playwright')
    await page.locator('input').nth(1).fill('Opción A')
    await page.locator('input').nth(2).fill('Opción B')
    await page.getByRole('button', { name: 'Crear Encuesta' }).click()
    
    await expect(page.locator('text=Código:')).toBeVisible({ timeout: 10000 })
  })

  test('4. Estudiante se une a encuesta con código', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    await page.getByRole('button', { name: 'Entrar como Estudiante' }).click()
    
    await expect(page.locator('h2:has-text("Unirse a una Encuesta")')).toBeVisible()
    
    await page.locator('input[placeholder="Ej: Juan García"]').fill('Estudiante Test')
    await page.locator('input[placeholder*="AB12CD"]').fill('TESTPW')
    await page.getByRole('button', { name: 'Unirse a Encuesta' }).click()
    
    await expect(page.locator('text=No se encontró la encuesta')).toBeVisible({ timeout: 10000 })
  })

  test('5. Caso negativo: Login con credenciales incorrectas', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    await page.getByRole('button', { name: 'Entrar como Profesor' }).click()
    
    await page.locator('input[autocomplete="username"]').fill('profesor')
    await page.locator('input[autocomplete="current-password"]').fill('passwordincorrecto')
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.locator('text=Credenciales inválidas')).toBeVisible({ timeout: 10000 })
  })

  test('6. Caso negativo: Crear encuesta sin título muestra error', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    await page.getByRole('button', { name: 'Entrar como Profesor' }).click()
    await page.locator('input[autocomplete="username"]').fill('profesor')
    await page.locator('input[autocomplete="current-password"]').fill('123456')
    await page.getByRole('button', { name: 'Entrar' }).click()
    
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible({ timeout: 10000 })
    
    await page.getByRole('button', { name: '+ Nueva Encuesta' }).click()
    await expect(page.locator('h2:has-text("Nueva Encuesta")')).toBeVisible()
    
    await page.locator('input').nth(1).fill('Opción A')
    await page.locator('input').nth(2).fill('Opción B')
    await page.getByRole('button', { name: 'Crear Encuesta' }).click()
    
    await expect(page.locator('text=Por favor ingresa un título')).toBeVisible()
  })

  test('7. Caso negativo: Estudiante sin completar campos', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    await page.getByRole('button', { name: 'Entrar como Estudiante' }).click()
    await page.getByRole('button', { name: 'Unirse a Encuesta' }).click()
    
    await expect(page.locator('text=Por favor completa todos los campos')).toBeVisible()
  })

  test('8. Health check del backend responde', async ({ request }) => {
    const response = await request.get(API_URL + '/health')
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data.status).toBe('OK')
  })

  test('9. API login retorna token con credenciales válidas', async ({ request }) => {
    const response = await request.post(API_URL + '/api/auth/login', {
      data: { username: 'profesor', password: '123456' }
    })
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data.token).toBeDefined()
    expect(data.user.role).toBe('teacher')
  })

  test('10. Caso negativo: API login retorna 401 con password incorrecto', async ({ request }) => {
    const response = await request.post(API_URL + '/api/auth/login', {
      data: { username: 'profesor', password: 'wrongpass' }
    })
    expect(response.status()).toBe(401)
  })

})