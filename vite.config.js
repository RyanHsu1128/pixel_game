import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pixel_game/', // 重要：請將 pixel_game 改成您的 GitHub Repository 名稱
})
