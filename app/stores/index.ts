import { useAppStore } from './app.store'

export const useStore = defineStore('pinia', () => {
  const appStore = computed(() => useAppStore())

  return {
    app: appStore,
  }
})
