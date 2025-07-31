export const useAppStore = defineStore('app', () => {
  const name = ref('app')
  const updateName = (value: string) => {
    name.value = value
  }

  return {
    name,
    updateName,
  }
}, {
  persist: {
    pick: ['name'],
  },
})
