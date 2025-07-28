# 🚀 React Native Challenge v2024

## 🎯 Objectives

Develop a React Native app that includes:

1. A login screen with Google authentication.
2. A cryptocurrency list fetched from a REST API.
3. A detail screen for a selected cryptocurrency.

---

## 🛠️ Requirements

### 🔐 Login Screen

- Intuitive and secure UI.
- Implement login using Google Sign-In.
- Proper navigation flow after login to the crypto list screen.
- Handle authentication success and error states.

### 📈 Cryptocurrency List Screen

- Fetch data from the [CoinMarketCap REST API](https://coinmarketcap.com/api/).
- Display name, symbol, and current price.
- Add search functionality (by name or symbol).
- Allow users to mark favorites and persist them across app restarts.
- Toggle filter to display only favorite cryptocurrencies.

### 📊 Cryptocurrency Detail Screen

- On selecting a cryptocurrency, show detailed info:
  - Current price
  - 24h percentage change
  - Trading volume
- Refresh data every 30 seconds.
- Allow manual refresh.

---

## ✅ Evaluation Criteria

- ✔️ Fully functional with no bugs (iOS & Android).
- ✔️ Clean, well-structured code following best practices.
- ✔️ Secure handling of authentication and data.
- ✔️ Intuitive, attractive, and consistent UI/UX.
- ✔️ Includes unit and integration tests to validate logic and behavior.

---

## 📌 Notes

- 📂 Submit the project in a **public GitHub repo** with a **README** explaining the tech and libraries used.
- ⚙️ Use `react-native-cli` to bootstrap the project (do **not** use Expo).
