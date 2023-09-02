import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import path from 'path'
import solid from 'solid-start/vite'
// @ts-ignore
import netlify from 'solid-start-netlify'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [solid({ ssr: false, adapter: netlify({ edge: true }) }), UnoCSS()],
})
