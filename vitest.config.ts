import react from '@vitejs/plugin-react'
import { type PluginOption } from 'vite'
import tsconfig from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfig() as PluginOption, react()],
  test: {
    environment: 'jsdom',
  },
})
