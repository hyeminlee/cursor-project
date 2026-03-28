import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  /** GitHub Pages needs `/lovesmeornot/`; `vite dev` uses `/` so local URL is http://localhost:5173/ */
  base: command === 'build' ? '/lovesmeornot/' : '/',
  plugins: [react()],
}))