import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig as defineVitestConfig } from 'vitest/config' 


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__test__/setupTest.ts'],
  },
  });