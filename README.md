# Agro App

Agro App is a startup frontend prototype for helping farmers monitor crops,
fields, weather, and daily agricultural activities from a mobile application.
It is built with React Native and Expo, with file-based navigation through Expo
Router.

## Main functionalities

- **Dashboard:** View a weather summary, daily tasks, notifications, projects,
  and quick access to crop categories.
- **Weather and location:** Tap the weather card to open an interactive map,
  select a position, save it locally, and load weather data for that position.
- **Crop catalog:** Browse cereals, fruit trees, forage crops, vegetables, and
  other crop details.
- **Crop programs:** Open olive and orange tree programs, browse a calendar,
  and record farming logs for selected dates.
- **Farm map:** Select a parcel on the farm plan and view soil, air, pH, EC,
  nitrogen, and latest-reading information.
- **Alerts:** Review agricultural alerts and filter them by all, critical, or
  unread items.
- **Leaf scan:** Access the device camera to prepare a future AI plant-health
  analysis workflow.
- **Profile:** View farmer and farm information, statistics, and quick actions.

## Current prototype scope

This repository is currently a frontend startup prototype. Some screens use
local mock data and simulated farm measurements. The leaf-health AI action,
profile editing, settings, and several dashboard actions still need backend or
AI integration.

Weather data is fetched from [Open-Meteo](https://open-meteo.com/). Location
names use the device geocoder when available and fall back to
[Nominatim](https://nominatim.openstreetmap.org/). The selected map position is
stored locally with AsyncStorage.

## Tech stack

- React Native 0.86
- Expo 57
- Expo Router
- TypeScript
- React Native WebView and Leaflet/OpenStreetMap for position selection
- AsyncStorage for local preferences and farmer logs
- Poppins fonts and Expo vector icons

## Getting started

Install dependencies with pnpm:

```bash
pnpm install
```

Start the development server:

```bash
pnpm start
```

The Expo CLI can then open the app in Expo Go, an Android emulator, an iOS
simulator, or a development build.

## Useful commands

```bash
pnpm android       # Start with the Android target
pnpm ios           # Start with the iOS target
pnpm web           # Start the web target
pnpm lint          # Run ESLint
pnpm exec expo export --platform android  # Create an Android production bundle
```

## Project structure

- `app/`: Expo Router screens and routes
- `components/`: Reusable UI and farm-related components
- `constants/`: Colors, crop data, and program definitions
- `hooks/`: Calendar, farmer-log, and program state helpers
- `assets/`: Local images and visual assets
- `types/`: Shared TypeScript types
