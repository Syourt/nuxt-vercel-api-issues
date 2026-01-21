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
    modules: [
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@nuxt/test-utils/module',
        '@nuxt/content',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        'dayjs-nuxt',
        '@nuxt/eslint',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/fonts',
    ],
    devtools: {
        enabled: process.env.NODE_ENV === 'development',
    },
    router: {
        options: {
            scrollBehaviorType: 'smooth',
        },
    },
    content: {
        watch: {
            enabled: process.env.NODE_ENV === 'development',
        },
        preview: {
            api: 'https://api.nuxt.studio',
        },
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
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
        ],
    },
    sourcemap: true,
    future: {
        // https://nuxt.com/blog/v3-10#bundler-module-resolution
        typescriptBundlerResolution: true,
    },
    experimental: {
        componentIslands: true,
        inlineRouteRules: true,
    },
    typescript: {
        strict: true,
    },
    postcss: {
        plugins: {
            'tailwindcss/nesting': {},
            'postcss-nested': {},
            'tailwindcss': {},
            'autoprefixer': {},
        },
    },
    hooks: {
        'prepare:types'({
                tsConfig,
            }) {
            const aliasesToRemoveFromAutocomplete = ['~~', '~~/*', '@@', '@@/*'];
            for (const alias of aliasesToRemoveFromAutocomplete) {
                if (tsConfig.compilerOptions?.paths[alias]) {
                    delete tsConfig.compilerOptions?.paths[alias];
                }
            }
        },
    },
    dayjs: {
        locales: ['nl'],
        plugins: ['relativeTime', 'utc', 'timezone'],
        defaultLocale: 'nl',
        defaultTimezone: 'Europe/Amsterdam',
    },
    eslint: {
        config: {
            stylistic: {
                indent: 'tab',
                quotes: 'single',
                semi: true,
            },
        },
    },
    // https://image.nuxt.com/get-started/configuration
    image: {
        provider: 'vercel',
        format: ['avif', 'webp'],
        densities: [1, 2],
        screens: {
            'xs': 320,
            'sm': 640,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536,
            '1': 1,
            '2': 2,
            '384': 384,
            '400': 400,
            '800': 800,
            '960': 960,
            '1920': 1920,
        },
    },
})
