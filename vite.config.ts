import {fileURLToPath, URL} from 'node:url'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({mode}) => {
        const env = loadEnv(mode, process.cwd(), '')
        return {
            plugins: [
                vue(),
            ],
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            },
            server: {
                host: process.env.VITE_LOCAL_IP || 'localhost',
                port: process.env.VITE_LOCAL_PORT || '3000'
            }
        }
    }
)
