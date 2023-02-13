import { resolve } from 'path';
import { defineConfig, ConfigEnv } from 'vite';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/guide/build.html#library-mode

export default (configEnv: ConfigEnv) => {
    console.log('configEnv', configEnv);

    const rootPath = __dirname;

    return defineConfig({
        base: '/zselect',
        server: {
            port: 9999,
            open: false,
        },
        build: {
            // target: [
            //     'chrome58',
            //     'edge16',
            //     'firefox57',
            //     'safari11',
            // ],
            minify: false,
            lib: {
                entry: resolve(rootPath, 'src/main.ts'),
                formats: [
                    'umd', 'es', 'iife',
                ],
                name: 'zselect',
                fileName: 'zselect',
            },
            outDir: 'docs',
            emptyOutDir: false,
        },
        optimizeDeps: {
            entries: '',
        },
        plugins: [
            dts(),
        ],
    });
};
