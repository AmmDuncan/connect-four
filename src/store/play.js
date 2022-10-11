import {defineStore} from "pinia";

export const usePlayingStateStore = defineStore('playing state', {
  state: () => ({
    playing: true
  }),
  actions: {
    pause() {
      this.playing = false
    },
    resume() {
      this.playing = true
    }
  }
})