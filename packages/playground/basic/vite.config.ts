import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import extend from 'vite-plugin-vue-setup-support'

export default defineConfig({
  plugins: [vue(), extend()],
})
