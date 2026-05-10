<script setup>
import { useThemeStore } from '../stores/theme.js'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="theme-switch"
    :class="{ 'is-dark': theme.isDark }"
    role="switch"
    :aria-checked="theme.isDark"
    :title="theme.isDark ? 'Zu hellem Theme wechseln' : 'Zu dunklem Theme wechseln'"
    :aria-label="theme.isDark ? 'Helles Theme aktivieren' : 'Dunkles Theme aktivieren'"
    @click="theme.toggle()"
  >
    <span class="icon icon-sun" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </span>

    <span class="icon icon-moon" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </span>

    <span class="thumb" aria-hidden="true"></span>
  </button>
</template>

<style scoped>
.theme-switch {
  position: relative;
  width: 60px;
  height: 30px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-elev-2);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 200ms ease, border-color 200ms ease;
}

.theme-switch:hover {
  border-color: var(--text-muted);
}

.icon {
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  z-index: 1;
  pointer-events: none;
  transition: color 200ms ease;
}

.icon-sun {
  margin-left: 4px;
}
.icon-moon {
  margin-right: 4px;
}

.theme-switch:not(.is-dark) .icon-sun {
  color: var(--warn);
}
.theme-switch.is-dark .icon-moon {
  color: var(--info);
}

.thumb {
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-elev-1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: left 220ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms ease;
}

.theme-switch.is-dark .thumb {
  left: calc(100% - 24px - 2px);
}

.theme-switch:active .thumb {
  width: 26px;
}
</style>
