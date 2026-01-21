// https://nuxt.com/docs/api/configuration/nuxt-config
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
    }
})
