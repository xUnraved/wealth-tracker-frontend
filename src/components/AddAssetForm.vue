<script setup>
import { ref } from 'vue'
import { useAssetsStore } from '../stores/assets.js'

const store = useAssetsStore()
const open = ref(false)

const form = ref({
  name: '',
  category: 'STOCK',
  currentValue: '',
  purchasePrice: '',
  quantity: '',
  currency: 'EUR',
  purchaseDate: '',
  notes: ''
})

async function submitForm() {
  await store.addAsset({ ...form.value })
  form.value = {
    name: '',
    category: 'STOCK',
    currentValue: '',
    purchasePrice: '',
    quantity: '',
    currency: 'EUR',
    purchaseDate: '',
    notes: ''
  }
  open.value = false
}
</script>

<template>
  <div>
    <button class="add-btn" @click="open = true">+ Asset hinzufügen</button>

    <div v-if="open" class="overlay" @click.self="open = false">
      <div class="modal">
        <div class="modal-header">
          <h2>Neues Asset</h2>
          <button class="close-btn" @click="open = false">✕</button>
        </div>

        <div class="form-grid">
          <label>
            Name
            <input v-model="form.name" placeholder="z.B. MSCI World ETF" />
          </label>

          <label>
            Kategorie
            <select v-model="form.category">
              <option value="STOCK">Aktien</option>
              <option value="CRYPTO">Krypto</option>
              <option value="CASH">Bargeld</option>
              <option value="REAL_ESTATE">Immobilien</option>
              <option value="OTHER">Sonstige</option>
            </select>
          </label>

          <label>
            Aktueller Wert
            <input v-model="form.currentValue" type="number" placeholder="0.00" />
          </label>

          <label>
            Kaufpreis
            <input v-model="form.purchasePrice" type="number" placeholder="0.00" />
          </label>

          <label>
            Menge
            <input v-model="form.quantity" type="number" placeholder="0" />
          </label>

          <label>
            Währung
            <input v-model="form.currency" placeholder="EUR" />
          </label>

          <label>
            Kaufdatum
            <input v-model="form.purchaseDate" type="date" />
          </label>

          <label class="full-width">
            Notizen
            <input v-model="form.notes" placeholder="Optional" />
          </label>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="open = false">Abbrechen</button>
          <button class="submit-btn" @click="submitForm">Hinzufügen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-btn {
  padding: 0.55rem 1.2rem;
  background: var(--accent, #4ade80);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  color: #000;
  align-self: flex-start;
}

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

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--text-muted);
  padding: 0.25rem;
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
  background: var(--bg-elev-2, #1e2330);
  color: var(--text-primary);
  font-size: 0.95rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
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
  background: var(--accent, #4ade80);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  color: #000;
}
</style>