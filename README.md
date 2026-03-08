# 🌙 Noor-e-Ramadan — নূরে রমজান

<div align="center">

![Noor-e-Ramadan Banner](public/banner.jpg)

**A full-stack Ramadan companion app built with Next.js 15**  
বাংলা ও ইংরেজিতে রমজানের সব তথ্য এক জায়গায়

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🌐 Live Demo](https://noor-e-ramadan-tau.vercel.app) · [🐛 Report Bug](https://github.com/yourusername/noor-e-ramadan/issues) · [✨ Request Feature](https://github.com/yourusername/noor-e-ramadan/issues)

</div>

---

## ✨ Features

### 🕌 Ramadan Essentials
- **Sehri & Iftar Timings** — সব ৬৪ জেলার সেহরি ও ইফতারের সময়সূচি
- **Full Ramadan Schedule** — ৩০ রোজার সম্পূর্ণ তালিকা
- **Salah Timings** — ফজর, যোহর, আসর, মাগরিব, ইশার সময়

### 🤲 Duas Collection
- **১৭+ দোয়া** — রমজানের বিশেষ দোয়াসমূহ
- Arabic text, বাংলা অনুবাদ ও রেফারেন্স সহ
- Copy to clipboard, Expand/Collapse long duas

### 🍽️ Recipes
- **২৮টি রেসিপি** — ইফতার, সেহরি, ড্রিংকস ও উভয় ক্যাটাগরি
- Prep time, description ও step-by-step instructions

### 👤 User Features (Auth Required)
- **Dashboard** — আজকের Goals checklist with progress tracker
- **Bookmarks** — দোয়া ও রেসিপি বুকমার্ক করুন
- **Profile** — Stats দেখুন (Goals, Bookmarks)

### 🌐 Bilingual Support
- সম্পূর্ণ **বাংলা ও ইংরেজি** ভাষা সাপোর্ট
- One-click language toggle

### 🎨 UI/UX
- **Dark & Light mode** with smooth transitions
- Animated Navbar with compact scroll mode
- Fully **responsive** — mobile, tablet, desktop
- Framer Motion animations throughout

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Database | MongoDB Atlas |
| Auth | NextAuth.js v4 |
| Password | bcryptjs |
| Alerts | SweetAlert2 |
| Icons | React Icons |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── bookmarks/
│   │   ├── goals/
│   │   └── register/
│   ├── dashboard/
│   │   └── components/
│   ├── duas/
│   ├── namaz/
│   ├── profile/
│   │   └── components/
│   ├── recipes/
│   │   └── [id]/
│   ├── timings/
│   └── page.js
├── components/
│   ├── Banner.js
│   ├── DuaCard.js
│   ├── DuasSection.js
│   ├── Footer.js
│   ├── Navbar.js
│   ├── RecipeCard.js
│   ├── RecipeDetail.js
│   ├── TimingsCards.js
│   └── UserMenu.js
├── context/
│   ├── LangContext.js
│   └── ThemeContext.js
├── data/
│   ├── contents.js
│   ├── districts.js
│   ├── duas.js
│   ├── recipes.js
│   └── timings.js
└── lib/
    ├── mongodb.js
    ├── useBookmark.js
    ├── useCurrentTime.js
    ├── useLogout.js
    └── utils.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/noor-e-ramadan.git
cd noor-e-ramadan
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

`.env.local` ফাইল তৈরি করুন:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/noor-e-ramadan?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

**4. Run the development server**
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) এ খুলুন।

---

## 🌍 Deployment (Vercel)

**1.** Vercel এ project deploy করুন

**2.** Settings → Environment Variables এ এগুলো add করুন:

| Variable | Value |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas URI |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Your secret key |

**3.** Redeploy করুন — ব্যস!

---

## 📸 Screenshots

| Home | Dashboard | Duas |
|---|---|---|
| ![Home](screenshots/home.png) | ![Dashboard](screenshots/dashboard.png) | ![Duas](screenshots/duas.png) |

---

## 🤝 Contributing

Pull requests welcome! বড় কোনো change এর জন্য আগে issue খুলুন।

```bash
# Fork করুন
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
# Pull Request খুলুন
```

---

## 📄 License

MIT License — দেখুন [LICENSE](LICENSE) ফাইল।

---

## 🙏 Credits

- **Design & Development** — [Your Name](https://github.com/yourusername)
- **Special Thanks** — Nishat Jahan ❤️
- Ramadan timings data — [Aladhan API](https://aladhan.com/)
- Arabic fonts — Google Fonts (Amiri)

---

<div align="center">

**রমজান মোবারক 🌙**

Made with ❤️ for the Muslim community of Bangladesh

⭐ Star this repo if you found it helpful!

</div>