// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
import { sentryVitePlugin } from '@sentry/vite-plugin';

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
    vite: {
        plugins: [
            // https://gearboxgo.com/articles/web-application-development/setting-up-sentry-with-nuxt-3
            sentryVitePlugin({
                disable: !process.env.SENTRY_AUTH_TOKEN,
                authToken: process.env.SENTRY_AUTH_TOKEN,
                org: process.env.SENTRY_ORG,
                project: process.env.SENTRY_PROJECT,
            }),
        ],
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
