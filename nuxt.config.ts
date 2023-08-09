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
    },
  },
  // websockets: {
  //   path: '/ws',
  //   sockets: [
  //     {
  //       name: 'local',
  //       url: 'https://api.wiki.itl.systems/',
  //     },
  //   ],
  // },
});
