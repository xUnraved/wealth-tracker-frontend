import { defineStore } from 'pinia'

export const useAssetsStore = defineStore('assets', {
  state: () => ({
    assets: [],
    selectedCategory: 'ALL'
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
    },
    async fetchAssets() {
      const response = await fetch('https://wealth-tracker-is52.onrender.com/assets')
      this.assets = await response.json()
    },
    async addAsset(asset) {
      const response = await fetch('https://wealth-tracker-is52.onrender.com/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asset)
      })
      const saved = await response.json()
      this.assets.push(saved)
    },
    async updateAsset(id, asset) {
      const response = await fetch(`https://wealth-tracker-is52.onrender.com/assets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asset)
      })
      const updated = await response.json()
      const index = this.assets.findIndex(a => a.id === id)
      if (index !== -1) this.assets[index] = updated
    },
    async deleteAsset(id) {
      await fetch(`https://wealth-tracker-is52.onrender.com/assets/${id}`, {
        method: 'DELETE'
      })
      this.assets = this.assets.filter(a => a.id !== id)
    }
  }
})