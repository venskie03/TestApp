import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,          // allows access from LAN and external hosts
    port: 5173,          // your dev server port (default for Vite)
    allowedHosts: [
      'localhost',       // always allow localhost
      '127.0.0.1',       // allow loopback
      '::1',             // IPv6 loopback
      'c78a-124-217-117-157.ngrok-free.app'  // your ngrok URL
    ],
  },
})
