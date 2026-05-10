import { defineStore } from 'pinia'

// Pinia-Store für das aktive Farbschema (hell / dunkel).
// Der Modus wird in localStorage persistiert und auf das <html>-Element
// als data-theme="..." geschrieben, damit die CSS-Variablen in style.css
// passend umgeschaltet werden.
const STORAGE_KEY = 'wt:theme'

const readInitialMode = () => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'dark'
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: readInitialMode()
  }),
  getters: {
    isDark: (state) => state.mode === 'dark'
  },
  actions: {
    // Schreibt den aktuellen Modus aufs <html>-Element. Direkt nach
    // App-Start in main.js aufrufen, damit nichts im falschen Theme blitzt.
    apply() {
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = this.mode
      }
    },
    toggle() {
      this.mode = this.mode === 'dark' ? 'light' : 'dark'
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, this.mode)
      }
      this.apply()
    }
  }
})
