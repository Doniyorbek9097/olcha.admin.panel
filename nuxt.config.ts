// https://nuxt.com/docs/api/configuration/nuxt-config

import { Loading, Notify } from "quasar";

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  target:"static",


  css: [
    '~/assets/css/main.css',
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
    '@quasar/extras/bootstrap-icons/bootstrap-icons.css',
  ],
  modules: [
    '@vite-pwa/nuxt',
    'nuxt-quasar-ui',
    '@element-plus/nuxt',
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

  pwa: {
    /* PWA options */
    workbox: {
      enabled: true, // true yoki false bo'lishi mumkin
    },
    registerType:"autoUpdate",
    manifest: {
      name: "SportsWire",
      short_name: "SportsWire",
      description: "Up-to-date Sports News and Analysis App.",
      theme_color: "#6a5acd",
      lang: "en",
      background_color: "#6a5acd",
    },

    // https://pwa.nuxtjs.org/icon
    icon: {
      fileName:"./assets/logo.png",
      sizes: [64, 120, 144, 152, 192, 384, 512], //Array of sizes to be generated (Square).These are the default values
    },
    // https://pwa.nuxtjs.org/meta
    // Meta easily adds common meta tags into your project with zero-config needed. 
    meta: {
      name: "SportsWire",
      description: "Up-to-date Sports News and Analysis App.",
      author: "Vino Samari",
      theme_color: "#6a5acd",
      nativeUi: true,
      appleStatusBarStyle: "black",
      mobileAppIOS: true,
    }
  },

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
      baseURL: process.env.BASE_URL || 'http://localhost:5000',
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
