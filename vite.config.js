import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ✅ Markdown файлларды қосыў
  assetsInclude: ['**/*.md'],
  
  // ✅ Public папкасын дурыс көрсетиў
  publicDir: 'public',
  
  // ✅ Server конфиги
  server: {
    port: 3000,
    open: true
  }
});