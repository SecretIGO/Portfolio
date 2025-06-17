import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: {
      app: {
        name: 'firefox'
      }
    }
  },
  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
      '@mui/system': '@mui/system',
      '@mui/material': '@mui/material',
      '@mui/icons-material': '@mui/icons-material',
      '@mui/joy': '@mui/joy'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/system',
      '@mui/material',
      '@mui/icons-material',
      '@mui/joy'
    ]
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
}) 