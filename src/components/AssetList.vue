<script setup>
import AssetCard from './AssetCard.vue'

defineProps({
  assets: { type: Array, required: true }
})

const emit = defineEmits(['select'])
</script>

<template>
  <section class="asset-list">
    <h2 class="section-title">Vermögenswerte</h2>

    <p v-if="assets.length === 0" class="empty">
      Keine Assets in dieser Kategorie.
    </p>

    <div v-else class="grid">
      <AssetCard
          v-for="asset in assets"
          :key="asset.id"
          :asset="asset"
          @select="emit('select', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.asset-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.section-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.empty {
  color: var(--text-muted);
  background: var(--bg-elev-1);
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}
</style>