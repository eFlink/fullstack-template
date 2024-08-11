import { createNuxtApiHandler } from 'trpc-nuxt'
import { appRouter } from '~/server/trpc/root'
import { createContext } from '~/server/trpc/context'

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
})
