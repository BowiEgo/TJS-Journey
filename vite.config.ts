import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

export default {
    base: './',
    server: {
        host: true,
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: '[hash].[name].[ext]',
            },
        },
    },
    plugins: [react(), glsl()],
}
