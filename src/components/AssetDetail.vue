<script setup>
import { ref, watch } from 'vue'
import { useAssetsStore } from '../stores/assets.js'

const store = useAssetsStore()

const props = defineProps({
  asset: { type: Object, default: null }
})
const emit = defineEmits(['close'])

const CATEGORY_META = {
  STOCK:       { label: 'Aktien',     color: '#4ade80' },
  CRYPTO:      { label: 'Krypto',     color: '#fbbf24' },
  CASH:        { label: 'Bargeld',    color: '#60a5fa' },
  REAL_ESTATE: { label: 'Immobilien', color: '#c084fc' },
  OTHER:       { label: 'Sonstige',   color: '#f87171' }
}

const editing = ref(false)
const form = ref({})

watch(() => props.asset, (val) => {
  if (val) {
    const date = Array.isArray(val.purchaseDate)
      ? `${val.purchaseDate[0]}-${String(val.purchaseDate[1]).padStart(2,'0')}-${String(val.purchaseDate[2]).padStart(2,'0')}`
      : val.purchaseDate
    form.value = { ...val, purchaseDate: date }
    editing.value = false
  }
})

async function save() {
  await store.updateAsset(props.asset.id, { ...form.value })
  emit('close')
}

async function remove() {
  if (confirm(`${props.asset.name} wirklich löschen?`)) {
    await store.deleteAsset(props.asset.id)
    emit('close')
  }
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)

const formatDate = (iso) => {
  if (Array.isArray(iso)) {
    const [y, m, d] = iso
    return new Intl.DateTimeFormat('de-DE').format(new Date(y, m - 1, d))
  }
  return new Intl.DateTimeFormat('de-DE').format(new Date(iso))
}
</script>

<template>
  <div v-if="asset" class="overlay" @click.self="emit('close')">
    <div class="modal">

      <div class="modal-header">
        <span class="badge" :style="{
          backgroundColor: (CATEGORY_META[asset.category]?.color ?? '#8a93a6') + '22',
          color: CATEGORY_META[asset.category]?.color ?? '#8a93a6'
        }">
          {{ CATEGORY_META[asset.category]?.label ?? asset.category }}
        </span>
        <button class="close-btn" @click="emit('close')">✕</button>
      </div>

      <!-- Ansicht -->
      <template v-if="!editing">
        <h2 class="asset-name">{{ asset.name }}</h2>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Aktueller Wert</span>
            <span class="info-value">{{ formatCurrency(asset.currentValue) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Kaufpreis</span>
            <span class="info-value">{{ formatCurrency(asset.purchasePrice) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Menge</span>
            <span class="info-value">{{ asset.quantity }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Währung</span>
            <span class="info-value">{{ asset.currency }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Kaufdatum</span>
            <span class="info-value">{{ formatDate(asset.purchaseDate) }}</span>
          </div>
          <div class="info-item" v-if="asset.notes">
            <span class="info-label">Notizen</span>
            <span class="info-value">{{ asset.notes }}</span>
          </div>
        </div>

        <div class="modal-footer">
          <button class="delete-btn" @click="remove">Löschen</button>
          <button class="edit-btn" @click="editing = true">Bearbeiten</button>
        </div>
      </template>

      <!-- Bearbeiten -->
      <template v-else>
        <div class="form-grid">
          <label>Name<input v-model="form.name" /></label>
          <label>Kategorie
            <select v-model="form.category">
              <option value="STOCK">Aktien</option>
              <option value="CRYPTO">Krypto</option>
              <option value="CASH">Bargeld</option>
              <option value="REAL_ESTATE">Immobilien</option>
              <option value="OTHER">Sonstige</option>
            </select>
          </label>
          <label>Aktueller Wert<input v-model="form.currentValue" type="number" /></label>
          <label>Kaufpreis<input v-model="form.purchasePrice" type="number" /></label>
          <label>Menge<input v-model="form.quantity" type="number" /></label>
          <label>Währung<input v-model="form.currency" /></label>
          <label>Kaufdatum<input v-model="form.purchaseDate" type="date" /></label>
          <label class="full-width">Notizen<input v-model="form.notes" /></label>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="editing = false">Abbrechen</button>
          <button class="submit-btn" @click="save">Speichern</button>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: var(--bg-elev-1);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.75rem;
  width: min(520px, 90vw);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--text-muted);
}

.asset-name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.form-grid label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.full-width {
  grid-column: 1 / -1;
}

.form-grid input,
.form-grid select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-elev-2);
  color: var(--text-primary);
  font-size: 0.95rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.delete-btn {
  padding: 0.55rem 1.1rem;
  border: none;
  border-radius: 8px;
  background: var(--danger);
  color: #ffffff;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  margin-right: auto;
}

.edit-btn {
  padding: 0.55rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
}

.cancel-btn {
  padding: 0.55rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.95rem;
}

.submit-btn {
  padding: 0.55rem 1.2rem;
  background: var(--accent);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  color: #ffffff;
}
</style>
