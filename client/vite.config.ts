import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//Revital TODO: add .env file
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
