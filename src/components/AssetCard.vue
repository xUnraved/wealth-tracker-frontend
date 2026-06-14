<script setup>
import { computed } from 'vue'

const CATEGORY_META = {
  STOCK:       { label: 'Aktien',     color: '#4ade80' },
  CRYPTO:      { label: 'Krypto',     color: '#fbbf24' },
  CASH:        { label: 'Bargeld',    color: '#60a5fa' },
  REAL_ESTATE: { label: 'Immobilien', color: '#c084fc' }
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

const formatDate = (iso) =>
    new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso))
</script>