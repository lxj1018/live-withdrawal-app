import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vue from '@vitejs/plugin-vue' 

export default defineConfig({
  plugins: [
    vue(), 
    nodePolyfills({
      include: ['crypto', 'stream', 'process'],
      globals: {
        Buffer: true,
        global: true,
        process: true
      }
    })
  ],
  resolve: {
    alias: {
      
      '@': '/src',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify'
    }
  }
})