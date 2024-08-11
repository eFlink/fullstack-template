// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    "@nuxt/image"
  ],
  // Shadcn-vue
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },  
  // Color toggle
  colorMode: {
    classSuffix: ''
  },
  // tRPC
  build: {
    transpile: ['trpc-nuxt']
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: false
  }
})