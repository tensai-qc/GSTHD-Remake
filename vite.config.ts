import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat any tag with a hyphen as a native custom element
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
})
