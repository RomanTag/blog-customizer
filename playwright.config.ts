// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Папка с тестами
  timeout: 30000, // Таймаут для тестов
  retries: 2, // Количество повторов при неудаче
  use: {
    headless: true, // Запуск в безголовом режиме
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: './test-results/', // Папка для сохранения результатов тестов
});
