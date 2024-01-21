// https://nuxt.com/docs/api/configuration/nuxt-config

import { Loading, Notify } from "quasar";

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  target:"static",

  image: {
    inject: true,
    quality: 80,
    format: ['avif'],
    loading:'lazy',
  screens: {
    'xs': 320,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    'xxl': 1536,
    '2xl': 1536
  },

  },

  css: [
    '~/assets/css/main.css',
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
    '@quasar/extras/bootstrap-icons/bootstrap-icons.css',
  ],
  modules: [
    'nuxt-quasar-ui',
    ['@pinia/nuxt',
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],

    '@nuxtjs/i18n',
    '@nuxt/image-edge'
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
