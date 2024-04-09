import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
import {visualizer} from 'rollup-plugin-visualizer'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: 'localhost',
        port: 3000
    },
    plugins: [react(), visualizer()],
    assetsInclude: ['**/*.md']
})