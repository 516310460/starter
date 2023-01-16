import { defineStore } from 'pinia'

export const useBitgetStore = defineStore({
  id: 'Bitget',
  // Extended configuration
  persist: {
    // Enable cache
    enabled: true,
    strategies: [
      {
        key: 'demo', // The default key is the id of the above store, and the key can be customized
        // sessionStorage、localStorage、cookie
        storage: 'sessionStorage', // The default is sessionStorage session storage, which can be set to localStorage local long storage
        paths: ['saveCount']
      }
    ]
  },
  state: () => ({
    count: 0,
    saveCount: 0
  }),
  getters: {
    getCount: (state) => state.count,
  },
  actions: {
    setCount(state: number){
      this.count = state
    },
    setSaveCount(state: number){
      this.saveCount = state
    },
  }
})
