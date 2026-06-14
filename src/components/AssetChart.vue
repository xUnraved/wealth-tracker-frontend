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
  assets: { type: Array, required: true }
})

const total = computed(() =>
    props.assets.reduce((sum, a) => sum + a.currentValue, 0)
)

const segments = computed(() => {
  const sums = {}
  for (const asset of props.assets) {
    sums[asset.category] = (sums[asset.category] ?? 0) + asset.currentValue
  }
  return Object.entries(sums)
      .filter(([, value]) => value > 0)
      .map(([category, value]) => ({
        category,
        value,
        label: CATEGORY_META[category]?.label ?? category,
        color: CATEGORY_META[category]?.color ?? '#8a93a6',
        share: total.value === 0 ? 0 : value / total.value
      }))
      .sort((a, b) => b.value - a.value)
})

const RADIUS_OUTER = 80
const RADIUS_INNER = 50
const CENTER = 100

const polar = (radius, angleRad) => ({
  x: CENTER + radius * Math.cos(angleRad),
  y: CENTER + radius * Math.sin(angleRad)
})

const buildArcPath = (startAngle, endAngle) => {
  if (endAngle - startAngle >= Math.PI * 2 - 0.0001) {
    return `
      M ${CENTER - RADIUS_OUTER} ${CENTER}
      A ${RADIUS_OUTER} ${RADIUS_OUTER} 0 1 1 ${CENTER + RADIUS_OUTER} ${CENTER}
      A ${RADIUS_OUTER} ${RADIUS_OUTER} 0 1 1 ${CENTER - RADIUS_OUTER} ${CENTER}
      M ${CENTER - RADIUS_INNER} ${CENTER}
      A ${RADIUS_INNER} ${RADIUS_INNER} 0 1 0 ${CENTER + RADIUS_INNER} ${CENTER}
      A ${RADIUS_INNER} ${RADIUS_INNER} 0 1 0 ${CENTER - RADIUS_INNER} ${CENTER}
      Z
    `
  }
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  const outerStart = polar(RADIUS_OUTER, startAngle)
  const outerEnd = polar(RADIUS_OUTER, endAngle)
  const innerStart = polar(RADIUS_INNER, endAngle)
  const innerEnd = polar(RADIUS_INNER, startAngle)
  return `
    M ${outerStart.x} ${outerStart.y}
    A ${RADIUS_OUTER} ${RADIUS_OUTER} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerStart.x} ${innerStart.y}
    A ${RADIUS_INNER} ${RADIUS_INNER} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}
    Z
  `
}

const segmentPaths = computed(() => {
  let cursor = -Math.PI / 2
  return segments.value.map((seg) => {
    const start = cursor
    const end = cursor + seg.share * Math.PI * 2
    cursor = end
    return { ...seg, d: buildArcPath(start, end) }
  })
})

const formatCurrency = (value) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)
</script>