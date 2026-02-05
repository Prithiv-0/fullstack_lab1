# 🧼 Hygiene Helper

> A delightful React web app designed to help autistic children learn personal hygiene routines through visual guidance, timers, and positive reinforcement.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **12 Built-in Routines** | Handwashing, brushing teeth, showering, and more |
| 📊 **Visual Progress** | Track completion rates and earned stars |
| ⏱️ **Timed Steps** | Automatic 20-30 second countdowns |
| 🏆 **Achievement System** | 8 unlockable badges at milestones |
| 🌙 **Dark Mode** | Comfortable viewing in any lighting |
| 📈 **Dashboard** | Daily progress and streak tracking |
| 🔊 **Sensory Controls** | Toggle sound effects and animations |
| 💾 **Offline Ready** | All data persists in LocalStorage |
| ✏️ **Custom Routines** | Create your own personalized routines |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd lab1

# Install dependencies
cd client
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🛠️ Tech Stack

- **Frontend**: React 18.3 with React Router 7
- **Build Tool**: Vite 6.0
- **Styling**: Vanilla CSS with CSS Variables
- **State**: React Hooks + LocalStorage
- **Deployment**: Vercel-ready

---

## 📁 Project Structure

```
lab1/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppRoutes.jsx      # Route definitions
│   │   │   ├── Confetti.jsx       # Celebration animation
│   │   │   ├── FloatingShapes.jsx # Background visuals
│   │   │   ├── Mascot.jsx         # Friendly guide character
│   │   │   └── Navigation.jsx     # Bottom navigation bar
│   │   ├── pages/
│   │   │   ├── HomePage.jsx       # Routine selection grid
│   │   │   ├── ActivityPage.jsx   # Step-by-step execution
│   │   │   ├── CreateRoutinePage.jsx # Custom routine builder
│   │   │   ├── DashboardPage.jsx  # Stats & analytics
│   │   │   ├── ProgressPage.jsx   # Completion history
│   │   │   ├── RewardsPage.jsx    # Achievement badges
│   │   │   ├── ProfilePage.jsx    # User profile
│   │   │   └── SettingsPage.jsx   # App preferences
│   │   ├── App.jsx                # Root component & state
│   │   ├── style.css              # Global styles
│   │   └── main.jsx               # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── vercel.json                    # Deployment config
└── README.md
```

---

## 🧽 Available Routines

| # | Routine | Description |
|---|---------|-------------|
| 1 | 🧼 Wash Your Hands | Proper handwashing technique |
| 2 | 🪥 Brush Your Teeth | Morning & evening dental care |
| 3 | 😊 Wash Your Face | Facial cleansing steps |
| 4 | 💇 Comb Your Hair | Hair grooming routine |
| 5 | 🚿 Take a Shower | Full body washing guide |
| 6 | 🦷 Floss Your Teeth | Dental flossing technique |
| 7 | 💅 Trim Your Nails | Nail care routine |
| 8 | 👕 Change Your Clothes | Getting dressed steps |
| 9 | 🍳 Eat Your Breakfast | Morning meal routine |
| 10 | 🥗 Eat Your Lunch | Midday meal routine |
| 11 | 🌙 Get Ready for Bed | Bedtime preparation |
| 12 | ⚽ Play Outdoor Games | Physical activity time |

---

## 🎮 How It Works

```
1️⃣ Select a Routine    →    Pick from the home page grid
        ↓
2️⃣ Follow Steps        →    Visual emoji guides + instructions
        ↓
3️⃣ Timer Countdown     →    Automatic 20-30 second timers
        ↓
4️⃣ Complete & Earn     →    Get ⭐ stars for each routine
        ↓
5️⃣ Unlock Badges       →    Achievements at star milestones
```

---

## ⚙️ Settings

| Setting | Options | Description |
|---------|---------|-------------|
| 🔊 Sound Effects | On / Off | Audio feedback on actions |
| 🎭 Motion Effects | On / Off | Animations and transitions |
| 🌓 Dark Mode | Light / Dark | Theme preference |

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🌐 Deployment

This project is configured for **Vercel** deployment. Simply connect your repository to Vercel and it will auto-deploy.

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

---

## 📄 License

MIT License - feel free to use this project for educational purposes.

---

<p align="center">
  Made with 💜 for helping children build healthy habits
</p>
