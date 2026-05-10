import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useThemeStore } from './stores/theme.js'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

useThemeStore().apply()

app.mount('#app')
