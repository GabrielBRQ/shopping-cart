import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // <--- ISSO É ESSENCIAL PARA O JEST-DOM FUNCIONAR
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // <--- Vamos criar esse arquivo no passo 2
    css: true, 
  },
})
