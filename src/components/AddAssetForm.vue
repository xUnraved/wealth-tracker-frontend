<script setup>
import { ref } from 'vue'
import { useAssetsStore } from '../stores/assets.js'

const store = useAssetsStore()

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
}
</script>

<template>
  <section class="add-form">
    <h2 class="section-title">Neues Asset hinzufügen</h2>
    <div class="form">
      <input v-model="form.name" placeholder="Name" />
      <select v-model="form.category">
        <option value="STOCK">Aktien</option>
        <option value="CRYPTO">Krypto</option>
        <option value="CASH">Bargeld</option>
        <option value="REAL_ESTATE">Immobilien</option>
      </select>
      <input v-model="form.currentValue" type="number" placeholder="Aktueller Wert" />
      <input v-model="form.purchasePrice" type="number" placeholder="Kaufpreis" />
      <input v-model="form.quantity" type="number" placeholder="Menge" />
      <input v-model="form.currency" placeholder="Währung (z.B. EUR)" />
      <input v-model="form.purchaseDate" type="date" placeholder="Kaufdatum" />
      <input v-model="form.notes" placeholder="Notizen" />
      <button @click="submitForm">Hinzufügen</button>
    </div>
  </section>
</template>

<style scoped>
.add-form {
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

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.form input,
.form select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-elev-1);
  color: var(--text);
  font-size: 0.95rem;
}

.form button {
  grid-column: 1 / -1;
  padding: 0.6rem;
  background: var(--accent, #4ade80);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
}
</style>