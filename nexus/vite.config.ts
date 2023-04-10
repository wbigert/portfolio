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

      // '/graphql': {
      //   target: 'https://api.studs.se/',
      //   changeOrigin: true
      // },
      // '/signed-upload': {
      //   target: 'https://devapi.studs.se/',
      //   changeOrigin: true
      // },
      // '/login': {
      //   target: 'https://devapi.studs.se/',
      //   changeOrigin: true
      // },
      '/graphql': {
        target: 'http://138.68.66.184',
        changeOrigin: true
      },
      '/signed-upload': {
        target: 'http://138.68.66.184',
        changeOrigin: true
      },
      '/login': {
        target: 'http://138.68.66.184',
        changeOrigin: true
      },
      '/forgot': {
        target: 'http://138.68.66.184',
        changeOrigin: true
      },
      '/reset': {
        target: 'http://138.68.66.184',
        changeOrigin: true
      },
      '/account/password': {
        target: 'http://138.68.66.184',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://studs23.s3.eu-north-1.amazonaws.com',
        changeOrigin: true
      }
    }
  }
})
