# IDF LOGO QUIZ - חידון סמלי צה״ל

Quiz app for recognizing IDF unit tags, ranks, berets, pins, flags, and war decorations.

Built with **Expo SDK 57**, **Expo Router**, and **React Native**.

## Features

- Browse nested categories and guess each emblem
- Accepts alternate spellings and abbreviations (normalized matching)
- Hints, skip, and per-item progress saved on device with AsyncStorage
- Portrait-first UI with forced RTL layout

## Requirements

- Node.js 20+
- Expo CLI (via `npx`)
- Xcode (iOS) and/or Android Studio (Android) for native runs

## Getting started

```bash
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

### Platform scripts

```bash
npm run ios       # native iOS build/run
npm run android   # native Android build/run
npm run web       # web
npm run lint      # Expo lint
```

## Project structure

```
src/
  app/           # Expo Router screens (home, category, quiz)
  components/    # UI building blocks
  context/       # Progress provider
  data/          # Categories, items, image map
  hooks/         # Progress persistence
  theme/         # Colors, spacing, typography
  types/         # Shared TypeScript types
  utils/         # Answer normalization/matching
assets/images/   # App icons, splash, quiz artwork
```

## Builds (EAS)

EAS is configured in `eas.json` (`development`, `preview`, `production`).

```bash
npx eas-cli build --platform ios
npx eas-cli build --platform android
```

App identity:

- iOS / Android package: `com.gennady9.idf.logo.quiz`
- Scheme: `idflogoquiz`

## Tech stack

- Expo ~57 / React Native 0.86 / React 19
- Expo Router (typed routes)
- AsyncStorage for progress
- Reanimated + Gesture Handler
- Custom fonts: Hanken Grotesk, JetBrains Mono

## License

See [LICENSE](LICENSE).
