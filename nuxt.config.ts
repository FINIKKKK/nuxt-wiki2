// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/styles/style.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/svg-sprite'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/styles/assets/variables";',
        },
      },
    },
  },
  svgSprite: {
    input: '~/assets/img/svg',
    output: '~/assets/sprite',
  },
  ssr: true,
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      apiUrl: 'https://api.wiki.itl.systems/',
    },
  },
});
