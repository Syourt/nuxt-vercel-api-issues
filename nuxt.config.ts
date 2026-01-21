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
    modules: [
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
    ],
    nitro: {
        prerender: {
            crawlLinks: true,
        },
    },
    routeRules: {
        '/**': { prerender: true },
    },
})
