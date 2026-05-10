# Wealth Tracker Frontend

Projekt für das Modul Webtechnologien – HTW Berlin, SoSe 2026

## Beschreibung
Ein persönlicher Vermögens-Tracker, mit dem man Aktien, ETFs, Krypto, Bargeld und andere Werte verwalten und den Überblick über sein Vermögen behalten kann.

## Tech-Stack
- Backend: Spring Boot (Java)
- Frontend: Vue.js
- Datenbank: PostgreSQL (folgt)
- Deployment: Render.com (folgt)

## Komponenten
| Komponente | Beschreibung |
|------------|--------------|
| `SummaryBar.vue` | Zeigt Gesamtvermögen, Gewinn/Verlust und Anzahl Assets |
| `CategoryFilter.vue` | Filtert Assets nach Kategorie |
| `AssetList.vue` | Rendert alle Assets als Liste |
| `AssetCard.vue` | Einzelne Asset-Karte |
| `AssetChart.vue` | Tortendiagramm der Vermögensverteilung |

## Starten
```bash
npm run dev
```

## Backend
Das zugehörige Backend-Repository ist hier zu finden:
https://github.com/xUnraved/wealth-tracker-backend
