import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        manifest: true, // Enable manifest generation
        rollupOptions: {
            input: './build/application.html', // Entry point for build only
        },
    },
});
