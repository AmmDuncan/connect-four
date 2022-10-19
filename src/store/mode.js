import {defineStore} from 'pinia'

export const useModeStore = defineStore('mode', {
  state: () => ({
    vs: "",
  }),
  getters: {
    vsCPU(state) {
      return state.vs === "cpu"
    }
  },
  actions: {
    setVS(payload) {
      this.vs = payload
    }
  },
  persist: true
})
