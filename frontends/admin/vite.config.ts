import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 3005,
    host: true,
    watch: {
       usePolling: true,
    },
  },
});