# F-Tech: Crypto Portfolio Tracker

A modern, cross-platform mobile application built with React Native and Expo for tracking cryptocurrency prices and portfolio information.

---

## ✨ Key Features

- **Interactive Price Charts**: Smooth, interactive charts to visualize historical price data. Built with `victory-native` and rendered with the power of `@shopify/react-native-skia`.
- **Real-time Data Scrubbing**: Press and drag on charts to see the exact price and date at any point, with values updated in real-time using `react-native-reanimated`.
- **Haptic Feedback**: Subtle physical feedback using `expo-haptics` enhances the user experience when interacting with charts.
- **Dynamic Routing**: Utilizes Expo's file-based routing (`expo-router`) to create detailed views for each cryptocurrency.
- **Modern Data Fetching**: Employs `@tanstack/react-query` for efficient, cached data fetching from the backend API.
- **Custom Component Library**: Built with a reusable `MyButton` component and a consistent design system (`Colors`, `Styles`).
- **Authenticated Routes**: The project structure suggests a separation between public and authenticated (`(authenticated)`) sections of the app.

---


## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router
- **Language**: TypeScript
- **Data Fetching & State Management**: TanStack Query (React Query)
- **Charts**: Victory Native
- **Rendering Engine**: React Native Skia
- **Animation**: React Native Reanimated
- **UI & Styling**:
  - Custom StyleSheet-based design system.
  - Vector Icons (`@expo/vector-icons`)
- **Clerk**: For user management and authentication.

## 📂 Project Structure

The project uses Expo's file-based routing system, which makes the structure intuitive.

```
ftech/
├── app/
│   ├── (authenticated)/
│   │   ├── crypto/
│   │   │   └── [id].tsx      # Dynamic detail screen for each crypto asset
│   │   └── ...               # Other screens requiring authentication
│   ├── _layout.tsx           # Main layout
│   └── index.tsx             # App entry point / home screen
├── api/                      # Mock API endpoints for development
│   ├── info.ts
│   └── tickers.ts
├── assets/
│   └── fonts/
├── components/
│   └── MyButton.tsx          # Reusable button component
├── constants/
│   ├── Colors.ts
│   └── Styles.ts
└── ...
```

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- A mobile simulator (iOS or Android) or a physical device
- Expo Go app installed on your simulator/device

### Installation
0. **.env**
   ```bash
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=? (from https://clerk.com/)
   CRYPTO_API_KEY=? (from https://coinmarketcap.com/)
   CRYPTO_BASE_URL=? (from https://coinmarketcap.com/)
   ```

1. **Clone the repository:**
   ```bash
   git clone git@github.com:wolfag/ftech.git
   cd ftech
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. **Start the Metro bundler:**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on a device/simulator:**
   - Scan the QR code with the Expo Go app on your physical device.
   - Press `i` to open on an iOS simulator.
   - Press `a` to open on an Android emulator.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---