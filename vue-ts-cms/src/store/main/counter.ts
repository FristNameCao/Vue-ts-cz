import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.count * 2
    }
  },
  actions: {
    changeDoubleCounter(newCounter: number) {
      return (this.count = newCounter)
    }
  }
})
export default useCounterStore
