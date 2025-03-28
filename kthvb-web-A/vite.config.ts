import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Add alias: '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '~bootstrap', replacement: path.resolve(__dirname, 'node_modules/bootstrap') }
    ]
  },
  root: './',
  publicDir: 'src/public/',
  server: {
    proxy: {
      ...
    }
  }
})
