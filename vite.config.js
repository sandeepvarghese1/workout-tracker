import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Add the `base` line
export default defineConfig({
  base: './',
  plugins: [react()],
})
