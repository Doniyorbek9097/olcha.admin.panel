export default defineNuxtConfig({
  // devtools: { enabled: false },
  ssr: true,
  target:"static",


  css: [
    '~/assets/css/main.css',
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
    '@quasar/extras/bootstrap-icons/bootstrap-icons.css',
  ],
  modules: [
    'nuxt-quasar-ui',
    '@element-plus/nuxt',
    'maz-ui/nuxt',
    ['@pinia/nuxt',
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],

    '@nuxtjs/i18n'
  ],

  imports: {
    dirs: ['stores']
  },

  quasar: {
    plugins: [
      "Loading",
      "Notify",
      "Dialog",
      "Cookies",
      "Screen",
      "LocalStorage",
      "AppFullscreen" 
    ]
  },

  mazUi: {
    injectComponents: true,
    injectCss: true,
    injectAos: {
      injectCss: true,
    },
    injectUseToast: true,
    injectUseThemeHandler: true,
    devtools: true,
  },

  // pwa: {
    // manifest: {
    //   name: "Nuxt3 PWA",
    //   short_name: "Nuxt3 PWA",
    //   description: "Testing Nuxt3 PWA",
    //   icons: [
    //     {
    //       src: "icons/icon_64x64.png",
    //       sizes: "64x64",
    //       type: "image/png",
    //     },
    //     {
    //       src: "icons/icon_144x144.png",
    //       sizes: "144x144",
    //       type: "image/png",
    //     },
    //     {
    //       src: "icons/icon_192x192.png",
    //       sizes: "192x192",
    //       type: "image/png",
    //     },
    //     {
    //       src: "icons/icon_512x512.png",
    //       sizes: "512x512",
    //       type: "image/png",
    //     },
    //   ],
    // },
    // workbox: {
    //   navigateFallback: "/",
    // },
    // devOptions: {
    //   enabled: true,
    //   type: "module",
    // },

  // },


  i18n: {
    langDir: "./locales",
    strategy: "prefix_except_default",
    defaultLocale: "uz",

    locales: [
      { code: 'ru', iso: 'ru', name: "RU", file: 'ru.json' },
      { code: 'uz', iso: 'uz', name: "UZ", file: 'uz.json' },
    ],


  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:5000/api/admin',
      MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Clozzone'
    },
  },


  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


})
