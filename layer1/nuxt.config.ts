// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath} from "node:url";

export default defineNuxtConfig({
    extends: [
        '../base',
    ],
    alias: {
        '#layer1': fileURLToPath(new URL('.', import.meta.url)),
    },
    routeRules: {
        /**
         * PRERENDER SETTINGS
         */
        '/_ipx/**': { prerender: true },
        '/': { prerender: true },
        '/**': { prerender: true },
        /**
         * API SETTINGS
         */
        '/api/**': { cors: true },
    },
    future: {
        // https://nuxt.com/blog/v3-10#bundler-module-resolution
        typescriptBundlerResolution: true,
    },
});
