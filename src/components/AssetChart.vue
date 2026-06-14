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

<template>
  <section class="chart-section">
    <h2 class="section-title">Verteilung nach Kategorie</h2>

    <div class="chart-card">
      <div v-if="segments.length === 0" class="empty">
        Keine Daten zum Anzeigen.
      </div>

      <template v-else>
        <svg viewBox="0 0 200 200" class="donut" role="img" aria-label="Vermögensverteilung">
          <path
              v-for="seg in segmentPaths"
              :key="seg.category"
              :d="seg.d"
              :fill="seg.color"
              stroke="var(--bg-elev-1)"
              stroke-width="1.5"
          />
          <text x="100" y="96" text-anchor="middle" class="donut-total-label">Gesamt</text>
          <text x="100" y="115" text-anchor="middle" class="donut-total-value">
            {{ formatCurrency(total) }}
          </text>
        </svg>

        <ul class="legend">
          <li v-for="seg in segments" :key="seg.category">
            <span class="dot" :style="{ backgroundColor: seg.color }"></span>
            <span class="legend-label">{{ seg.label }}</span>
            <span class="legend-share">{{ (seg.share * 100).toFixed(1) }} %</span>
            <span class="legend-value">{{ formatCurrency(seg.value) }}</span>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<style scoped>
.chart-section {
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

.chart-card {
  background: var(--bg-elev-1);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.donut {
  width: 220px;
  height: 220px;
  flex-shrink: 0;
}

.donut-total-label {
  fill: var(--text-muted);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.donut-total-value {
  fill: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
}

.legend {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend li {
  display: grid;
  grid-template-columns: 14px 1fr auto auto;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  background: var(--bg-elev-2);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.legend-label { color: var(--text-primary); }
.legend-share { color: var(--text-muted); font-variant-numeric: tabular-nums; }
.legend-value { font-weight: 600; font-variant-numeric: tabular-nums; }

.empty {
  color: var(--text-muted);
  text-align: center;
  padding: 2rem;
}
</style>