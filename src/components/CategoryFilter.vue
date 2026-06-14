<script setup>
defineProps({
  modelValue: { type: String, required: true }
})
const emit = defineEmits(['update:modelValue'])

const buttons = [
  { value: 'ALL',         label: 'Alle',       color: '#8a93a6' },
  { value: 'STOCK',       label: 'Aktien',     color: '#4ade80' },
  { value: 'CRYPTO',      label: 'Krypto',     color: '#fbbf24' },
  { value: 'CASH',        label: 'Bargeld',    color: '#60a5fa' },
  { value: 'REAL_ESTATE', label: 'Immobilien', color: '#c084fc' },
  { value: 'OTHER',       label: 'Sonstige',   color: '#f87171' }
]

const select = (value) => emit('update:modelValue', value)
</script>

<template>
  <div class="filter">
    <span class="filter-label">Filter:</span>
    <button
        v-for="btn in buttons"
        :key="btn.value"
        class="chip"
        :class="{ active: modelValue === btn.value }"
        :style="modelValue === btn.value
        ? { borderColor: btn.color, color: btn.color, backgroundColor: btn.color + '1A' }
        : null"
        @click="select(btn.value)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-right: 0.25rem;
}

.chip {
  background: var(--bg-elev-1);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.4rem 0.95rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
}

.chip:hover {
  border-color: #3a4254;
  background: var(--bg-elev-2);
}

.chip.active {
  font-weight: 600;
}
</style>