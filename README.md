# 📖 Flip Habit Agenda

> **Aesthetic Day & Night Flippable Habit Tracker & Journal**  
> Gerçekçi 3D sayfa çevirme efektine, gündüz & gece rutinlerine ve çizgili ajanda kağıdı üzerine serbest metin yazma özelliklerine sahip modern yaşam ajandası.

[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

---

## ✨ Özellikler (Features)

- ☀️ **Gündüz Modu (Day Page)**: Sabah rutinleri, günün öncelikli hedefleri, su takibi ve serbest not defteri.
- 🌙 **Gece Modu (Night Page)**: Akşam kapanış alışkanlıkları, uyku hazırlığı, gece ruh hali ve şükran günlüğü (gratitude journal).
- 🔄 **3D Gerçekçi Sayfa Çevirme (Page Flip)**:
  - Hem **Gündüz ↔ Gece** modları arasında hem de **günden güne (dün / bugün / yarın)** fiziksel defter yaprağı gibi 3D katlanarak çevrilen sayfalar.
  - Metinlerin ters dönmesini önleyen özel çift aşamalı (2-phase) katlanma/açılma animasyonu.
  - Klavyedeki **Sol (←)** ve **Sağ (→)** ok tuşlarıyla kolayca sayfa çevirebilme.
- 📝 **Çizgili Defter Üzerine Metin Yazımı**:
  - Ajanda çizgilerine oturan serbest yazım alanı.
  - Modern Sans veya El Yazısı (Handwritten) font seçeneği.
  - Kelime ve karakter sayacı, tek tıkla kopyalama ve otomatik kayıt (`localStorage`).
- 💧 **İnteraktif Su Takibi**: Günlük 8 bardak (2.0L) hedefi ile tıklanabilir su sayaçları.
- 🎭 **Ruh Hali (Mood Tracker)**: Gündüz ve geceye özel duygu/enerji seviyesi seçimi.
- 📚 **Günlük Arşivi & Takvim**: Geçmişte not yazılmış tüm günleri listeleyen ve istenen tarihe gitmeyi sağlayan arşiv çekmecesi.
- 🔊 **Gerçekçi Ses Efektleri**: Web Audio API ile sıfır harici dosya bağımlılığıyla sentezlenen kağıt hışırtısı ve alışkanlık tamamlama sesleri (sessize alınabilir).
- 🎉 **Kutlama Efekti**: Alışkanlıklar tamamlandığında çalışan konfeti animasyonu.

---

## 🚀 Başlangıç (Getting Started)

### Gereksinimler
- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- npm veya pnpm / yarn

### Kurulum

```bash
# Depoyu klonlayın
git clone https://github.com/silakayast-prog/flip-habit-agenda.git

# Proje dizinine girin
cd flip-habit-agenda

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:5173/` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Frontend**: React 19, JavaScript (ES Modules)
- **Derleyici & Paketleyici**: Vite
- **Stil & Tasarım**: Tailwind CSS v4, Custom 3D CSS Keyframes
- **İkonlar**: Lucide React
- **Ses**: Web Audio API (Native browser oscillator & noise buffer)
- **Efektler**: Canvas Confetti
- **Kalıcılık**: LocalStorage API

---

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.
