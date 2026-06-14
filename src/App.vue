<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAssetsStore } from './stores/assets.js'

import SummaryBar from './components/SummaryBar.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import AssetList from './components/AssetList.vue'
import AssetChart from './components/AssetChart.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import AddAssetForm from './components/AddAssetForm.vue'
import AssetDetail from './components/AssetDetail.vue'

const assetsStore = useAssetsStore()
const { selectedCategory, filteredAssets } = storeToRefs(assetsStore)

const selectedAsset = ref(null)

onMounted(() => {
  assetsStore.fetchAssets()
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="title">Wealth Tracker</h1>
      <ThemeToggle class="header-toggle" />
    </header>

    <main class="app-main">
      <SummaryBar :assets="filteredAssets" />

      <CategoryFilter v-model="selectedCategory" />

      <AddAssetForm />

      <div class="bottom-grid">
        <AssetList :assets="filteredAssets" @select="selectedAsset = $event" />
        <AssetChart :assets="filteredAssets" />
      </div>
    </main>

    <AssetDetail :asset="selectedAsset" @close="selectedAsset = null" />
  </div>
</template>

<style scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.app-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-align: center;
}

.header-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

@media (max-width: 480px) {
  .header-toggle {
    transform: translateY(calc(-50% - 0.5rem));
  }
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

@media (max-width: 900px) {
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}
</style>