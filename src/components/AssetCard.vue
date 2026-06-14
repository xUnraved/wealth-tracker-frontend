<script setup>
import { computed } from 'vue'

const CATEGORY_META = {
  STOCK:       { label: 'Aktien',     color: '#4ade80' },
  CRYPTO:      { label: 'Krypto',     color: '#fbbf24' },
  CASH:        { label: 'Bargeld',    color: '#60a5fa' },
  REAL_ESTATE: { label: 'Immobilien', color: '#c084fc' },
  OTHER:       { label: 'Sonstige',   color: '#f87171' }
}

const props = defineProps({
  asset: { type: Object, required: true }
})

const profit = computed(() => props.asset.currentValue - props.asset.purchasePrice)
const profitPercent = computed(() => (profit.value / props.asset.purchasePrice) * 100)

const categoryLabel = computed(() => CATEGORY_META[props.asset.category]?.label ?? props.asset.category)
const categoryColor = computed(() => CATEGORY_META[props.asset.category]?.color ?? '#8a93a6')

const formatCurrency = (value) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: props.asset.currency || 'EUR' }).format(value)

const formatDate = (iso) => {
  if (Array.isArray(iso)) {
    const [year, month, day] = iso
    return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
        .format(new Date(year, month - 1, day))
  }
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .format(new Date(iso))
}
</script>

<template>
  <article class="asset-card">
    <header class="card-header">
      <span class="badge" :style="{ backgroundColor: categoryColor + '22', color: categoryColor }">
        {{ categoryLabel }}
      </span>
      <span class="quantity">{{ asset.quantity }} Einh.</span>
    </header>

    <h3 class="name">{{ asset.name }}</h3>

    <div class="value-row">
      <span class="label">Aktueller Wert</span>
      <span class="current-value">{{ formatCurrency(asset.currentValue) }}</span>
    </div>

    <div class="value-row">
      <span class="label">Einstand</span>
      <span class="muted">{{ formatCurrency(asset.purchasePrice) }}</span>
    </div>

    <div class="profit" :class="profit >= 0 ? 'positive' : 'negative'">
      {{ profit >= 0 ? '+' : '' }}{{ formatCurrency(profit) }}
      <span class="percent">({{ profit >= 0 ? '+' : '' }}{{ profitPercent.toFixed(2) }} %)</span>
    </div>

    <footer class="card-footer">
      <span>Gekauft: {{ formatDate(asset.purchaseDate) }}</span>
      <span v-if="asset.notes" class="notes">{{ asset.notes }}</span>
    </footer>
  </article>
</template>

<style scoped>
.asset-card {
  background: var(--bg-elev-1);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  transition: transform 120ms ease, border-color 120ms ease;
}
.asset-card:hover {
  transform: translateY(-2px);
  border-color: #3a4254;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.quantity {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.value-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.label {
  color: var(--text-muted);
}

.current-value {
  font-weight: 600;
  color: var(--text-primary);
}

.muted {
  color: var(--text-muted);
}

.profit {
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.2rem;
}
.profit.positive { color: var(--accent); }
.profit.negative { color: var(--danger); }
.profit .percent {
  font-weight: 500;
  font-size: 0.85rem;
  margin-left: 0.35rem;
  opacity: 0.85;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
  padding-top: 0.55rem;
  margin-top: 0.3rem;
  gap: 0.5rem;
}
.notes {
  font-style: italic;
  text-align: right;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>