// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath} from "node:url";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    runtimeConfig: {
        nitro: {
            envPrefix: 'VERCEL_',
        },
        region: process.env.VERCEL_REGION,
    },
    nitro: {
        prerender: {
            crawlLinks: true,
        },
        minify: true,
        future: {
            nativeSWR: true,
        },
        compressPublicAssets: {
            gzip: true,
            brotli: true,
        },
    },
    routeRules: {
        '/**': { prerender: true },
    },
    alias: {
        '#base': fileURLToPath(new URL('.', import.meta.url)),
    },
    sourcemap: true,
    experimental: {
        componentIslands: true,
        inlineRouteRules: true,
    },
    typescript: {
        strict: true,
    },
    hooks: {
        'prepare:types'({ tsConfig }) {
            const aliasesToRemoveFromAutocomplete = ['~~', '~~/*', '@@', '@@/*'];
            for (const alias of aliasesToRemoveFromAutocomplete) {
                if (tsConfig.compilerOptions?.paths[alias]) {
                    delete tsConfig.compilerOptions?.paths[alias];
                }
            }
        },
    },
})
