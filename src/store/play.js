import {defineStore} from "pinia";

export const usePlayingStateStore = defineStore('playing state', {
  state: () => ({
    playing: true,
    scores: {player: {1: 0, 2: 0}, cpu: {1: 0, 2: 0}},
    timeRemaining: 0,
  }),
  actions: {
    pause() {
      this.playing = false
    },
    resume() {
      this.playing = true
    },
    resetScore(mode) {
      this.scores[mode] = {1: 0, 2: 0}
    },
    incrementScore(mode, player) {
      this.scores[mode] = {...this.scores[mode], [player]: this.scores[mode][player] + 1};
    },
    setTimeRemaining(newTime) {
      this.timeRemaining = newTime;
    }
  },
  persist: true
})