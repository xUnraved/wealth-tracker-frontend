import { defineStore } from 'pinia'
import { sampleAssets } from '../data/sampleAssets.js'

// Pinia-Store für die Asset-Liste und den aktiven Kategorie-Filter.
// In Milestone 3 wird hier statt der Beispieldaten ein fetch('/assets')
// vom Spring-Boot-Backend angebunden – die Komponenten bleiben gleich.
export const useAssetsStore = defineStore('assets', {
  state: () => ({
    assets: sampleAssets,
    selectedCategory: 'ALL' // 'ALL' = kein Filter
  }),
  getters: {
    filteredAssets: (state) =>
      state.selectedCategory === 'ALL'
        ? state.assets
        : state.assets.filter((a) => a.category === state.selectedCategory)
  },
  actions: {
    setCategory(category) {
      this.selectedCategory = category
    }
  }
})
