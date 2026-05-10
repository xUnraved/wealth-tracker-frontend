<script setup>
import { computed } from 'vue'

const props = defineProps({
  assets: { type: Array, required: true }
})

const totalValue = computed(() =>
  props.assets.reduce((sum, a) => sum + a.currentValue, 0)
)

const totalCost = computed(() =>
  props.assets.reduce((sum, a) => sum + a.purchasePrice, 0)
)

const totalProfit = computed(() => totalValue.value - totalCost.value)

const profitPercent = computed(() =>
  totalCost.value === 0 ? 0 : (totalProfit.value / totalCost.value) * 100
)

const formatCurrency = (value) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)
</script>

<template>
  <section class="summary">
    <div class="stat">
      <span class="stat-label">Gesamtvermögen</span>
      <span class="stat-value">{{ formatCurrency(totalValue) }}</span>
    </div>

    <div class="stat">
      <span class="stat-label">Gewinn / Verlust</span>
      <span class="stat-value" :class="totalProfit >= 0 ? 'positive' : 'negative'">
        {{ totalProfit >= 0 ? '+' : '' }}{{ formatCurrency(totalProfit) }}
        <span class="percent">
          ({{ totalProfit >= 0 ? '+' : '' }}{{ profitPercent.toFixed(2) }} %)
        </span>
      </span>
    </div>

    <div class="stat">
      <span class="stat-label">Anzahl Assets</span>
      <span class="stat-value">{{ assets.length }}</span>
    </div>
  </section>
</template>

<style scoped>
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: var(--bg-elev-1);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.stat-value.positive { color: var(--accent); }
.stat-value.negative { color: var(--danger); }

.percent {
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 0.3rem;
  opacity: 0.85;
}
</style>
