# 🚨 60-tka – Twoje lokalne zdarzenia (PWA Project)

## 📱 Opis aplikacji

**60-tka 🚨** to progresywna aplikacja webowa (PWA), która umożliwia użytkownikom szybkie zgłaszanie zdarzeń w ich najbliższej okolicy.

**Użytkownik może:**

- zrobić zdjęcie zdarzenia (np. dziura w drodze, wypadek, śmieci),
- pobrać swoją lokalizację GPS,
- zobaczyć miejsce zdarzenia na mapie,
- udostępnić zgłoszenie innym osobom.

Aplikacja działa na urządzeniach mobilnych (Android, iOS) oraz desktopie.

---

## ⚙️ Wykorzystane technologie

- HTML5
- CSS3 + Bootstrap 5
- JavaScript (Vanilla JS)
- Leaflet.js (OpenStreetMap)
- Web APIs:
  - 📸 Media Capture (kamera)
  - 📍 Geolocation API
  - 📤 Web Share API

- Progressive Web App:
  - manifest.json
  - service worker (offline support)

---

## 🚀 Funkcjonalnośc

### 📸 Robienie zdjęcia

Użytkownik może wykonać zdjęcie bezpośrednio z poziomu aplikacji.

### 📍 Lokalizacja GPS

Aplikacja pobiera aktualne współrzędne użytkownika i wykorzystuje je do oznaczenia miejsca zdarzenia.

### 🗺️ Mapa (OpenStreetMap)

- wyświetlenie mapy
- dodanie pinezki w miejscu zdarzenia

### 🖼️ Podgląd zdjęcia

Po wykonaniu zdjęcia pojawia się jego podgląd obok mapy.

### 📤 Udostępnianie

Możliwość udostępnienia zgłoszenia (zdjęcie + lokalizacja) przez:

- Messenger
- WhatsApp
- Gmail
- SMS
- AirDrop

### 📦 PWA

- możliwość instalacji aplikacji na urządzeniu
- działanie offline (Jeszcze nei działa :))
- responsywny interfejs

---

## 📁 Struktura projektu

```
/assets        → ikony i grafiki
/src
  /css         → style
  /js          → logika aplikacji
index.html     → główny plik aplikacji
manifest.json  → konfiguracja PWA
service-worker.js → obsługa offline
```

---

## 🌐 Demo

👉 [Link do aplikacji (GitHub Pages)](https://xdziuba.github.io/PWA/)

---

## 👥 Zespół

| Imię    | Nazwisko | Nr. Indeksu |
| ------- | -------- | ----------- |
| Paweł   | Dziuba   | 233812      |
| Jakub   | Rajca    | 234740      |
| Mikołaj | Bębenek  | 234200      |

---

## 📌 Uwagi

- Aplikacja wymaga dostępu do:
  - kamery
  - lokalizacji

- Funkcja offline dostępna po pierwszym załadowaniu aplikacji

---

## 📷 Podgląd

_Tutaj będzie screenshot działającej aplikacji_

---
