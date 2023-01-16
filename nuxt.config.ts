// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Hom Wang',
      meta: [
        { name: 'referrer', content: 'no-referrer' },
        // { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=true' }
      ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
      ],
    },
  },
  // Turn off rendering of Nuxt scripts and JS resource hints.
  // noscripts: true,
  css: ['~/assets/css/main.css'],
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    "@nuxtjs/i18n"
  ],
  i18n: {
    langDir: 'assets/locales/',
    lazy: true,
    baseUrl: 'http://localhost:3000',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English'
      },
      {
        code: 'zhCN',
        iso: 'zh-CN',
        file: 'zh-CN.json',
        name: '中文简体'
      }
    ],
    detectBrowserLanguage: false,
    vueI18n: {
      legacy: false,
      locale: "en",
    },
  },
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },
})
