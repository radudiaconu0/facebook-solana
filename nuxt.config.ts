// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/image-edge'],
    env: {
        SANITY_TOKEN: process.env.SANITY_TOKEN,
        SOLANA_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    },
    vite: {
        esbuild: {
            target: 'esnext',
        },
        build: {
            target: 'esnext',
        },
        optimizeDeps: {
            include: ['@project-serum/anchor', '@solana/web3.js', 'buffer'],
            esbuildOptions: {
                target: 'esnext'
            }
        },
        define: {
            'process.env.BROWSER': true
        }
    },
    vue: {
        config: {
            productionTip: false,
            devtools: true
        }
    }
})
