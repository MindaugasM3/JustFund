import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
plugins: [react(), tsconfigPaths()],
server: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000'
        },
        '/auth': {
            target: 'http://localhost:3000',
        },
        '/uploads': {
            target: 'http://localhost:3000',   
        }
        // '/funds': {
        //     target: 'http://localhost:3000/api/',
        //     changeOrigin: true
        // }, will get api
        
    },
}
    // optimizeDeps: {
    //     include: ['react-toastify']
    // },
  
  
})
// server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,  // Optional but useful in some cases
//         rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api prefix
//       },
//       '/auth': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/auth/, ''),
//       },
//       '/uploads': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/uploads/, ''),
//       },
//     },
//   },