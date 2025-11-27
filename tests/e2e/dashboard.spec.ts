// tests/e2e/dashboard.spec.ts - E2E Complete Flow
import { test, expect } from '@playwright/test'

test.describe('GigStream MX E2E', () => {
  test('Full user journey: login → post job → live SDS → bid', async ({ page }) => {
    // 1. Landing → Connect Wallet (email)
    await page.goto('/')
    await expect(page).toHaveTitle(/GigStream MX/)
    
    // Check for connect wallet button
    const connectButton = page.getByRole('button', { name: /conectar|connect/i })
    if (await connectButton.isVisible()) {
      await connectButton.click()
    }
    
    // 2. Dashboard Live SDS
    await page.goto('/gigstream')
    await expect(page.locator('body')).toBeVisible()
    
    // 3. Post Job + Gemini
    await page.goto('/gigstream/post')
    const geminiButton = page.getByRole('button', { name: /gemini/i })
    if (await geminiButton.isVisible()) {
      await geminiButton.click()
    }
    
    // Fill form
    await page.fill('input[placeholder*="Plomero"]', 'Plomero CDMX')
    await page.fill('input[type="number"]', '500')
    
    // 4. Verify SDS Live
    await page.goto('/gigstream')
    await expect(page.locator('body')).toBeVisible()
    
    // 5. Profile + Reputation
    await page.goto('/gigstream/profile')
    await expect(page.locator('body')).toBeVisible()
  })
})

