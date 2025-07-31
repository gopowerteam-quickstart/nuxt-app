// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  imports: {
    dirs: [
      './app/stores',
    ],
  },
  modules: [
    '@nuxt/eslint',
    '@prisma/nuxt',
    '@pinia/nuxt',
  ],
  eslint: {
    checker: true,
    config: {
      standalone: false,
    },
  },
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
})
