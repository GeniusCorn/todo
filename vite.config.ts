import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import path from 'path'
import solid from 'solid-start/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [solid({ ssr: false }), UnoCSS()],
})
