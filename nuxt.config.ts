// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/styles/style.scss'],
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/styles/assets/variables";',
        },
      },
    },
  },
  ssr: true,
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      url: 'http://localhost:3000',
      apiUrl: 'https://api.wiki.itl.systems/',
      pusher_key: process.env.PUSHER_APP_KEY,
      pusher_cluster: process.env.PUSHER_APP_CLUSTER,
    },
  },
});
