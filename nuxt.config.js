export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Flash Card Onlinee',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
      },
    ],
  },

  loading: {
    throttle: 0,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/rhpteam.min.css', '~/assets/css/external.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/core-component.js', '@/plugins/modals/v-modal.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL:
      process.env.BASE_API_URL ||
      'https://my-nuxt-app-fb651-default-rtdb.asia-southeast1.firebasedatabase.app',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // env
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
    baseApiUrl:
      process.env.BASE_API_URL ||
      'https://my-nuxt-app-fb651-default-rtdb.asia-southeast1.firebasedatabase.app',
    fbApiKey:
      process.env.FB_API_KEY || 'AIzaSyBK1JPXjeQF95K9kzq14bxiD8lhWAXV4dk',
  },

  // router
  router: {
    // middleware: 'router-log'
  },
}
