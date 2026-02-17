# AGENT ARMORY

> Cinematic Tactical Loadout Builder — A classified interactive experience

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎯 MISSION BRIEFING

**AGENT ARMORY** is a futuristic, cinematic web application that allows users to create, customize, and visualize modular virtual tactical loadouts. Think James Bond's Q lab meets Call of Duty's gunsmith meets Avengers' suit lab.

This is a **visual customization experience** — no real-world weapon construction or technical specifications.

## ✨ FEATURES

- 🎨 **Cinematic UI** - Black glass panels, neon accents, smooth animations
- 🔧 **Real-time Customization** - Live stat updates and visual feedback
- 💾 **Persistent Storage** - Save and load unlimited loadouts
- 📊 **Dynamic Stats** - Real-time calculation of stealth, mobility, power, and tech
- 🎯 **Base Model Selection** - Choose from 5 unique base models
- ⚙️ **Modular Attachments** - 8 categories with 20+ unique attachments
- 🏆 **Agent Progression** - Level up and unlock achievements
- 🎬 **Smooth Animations** - Powered by Framer Motion

## 🛠️ TECH STACK

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Cinematic animations
- **Zustand** - Lightweight state management
- **Local Storage** - Persistent data

## 🚀 DEPLOYMENT

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 PROJECT STRUCTURE

```
agent-armory/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AnimatedBackground.jsx
│   │   └── Navbar.jsx
│   ├── pages/           # Main screens
│   │   ├── Dashboard.jsx
│   │   ├── BaseSelection.jsx
│   │   ├── CustomizationLab.jsx
│   │   └── AgentProfile.jsx
│   ├── store/           # State management
│   │   └── loadoutStore.js
│   ├── data/            # Static data
│   │   └── loadoutData.js
│   ├── lib/             # Utilities
│   │   ├── motionVariants.js
│   │   └── utils.js
│   ├── styles/          # Global styles
│   │   └── index.css
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎮 USER FLOW

1. **Dashboard** - View saved loadouts and agent stats
2. **Base Selection** - Choose from 5 cinematic base models
3. **Customization Lab** - Add attachments, see real-time stat changes
4. **Save & Compare** - Store builds and view agent profile

## 🖼️ IMAGES & ASSETS

The application uses real images for an immersive experience:

### Current Image Sources

- **Base Models**: High-quality tactical gear images from Unsplash
- **Weapon Skins**: Texture and pattern images
- **Background**: Subtle atmosphere imagery

### Adding Custom Images

To use your own images:

1. Place images in the `public/` folder:
   - `public/models/` - Base model images (800x800px recommended)
   - `public/skins/` - Weapon skin previews (400x400px)
   - `public/backgrounds/` - Background images (1920x1080px)

2. Update image paths in `src/data/loadoutData.js`:
   ```javascript
   {
     id: 'phantom',
     name: 'PHANTOM',
     image: '/models/phantom.png', // Your custom image
     // ...
   }
   ```

### Image Requirements

- **Format**: PNG, JPG, or WebP
- **Base Models**: Square format, 800x800px minimum
- **Skins**: Square format, 400x400px minimum
- **Backgrounds**: Wide format, 1920x1080px recommended

## 🎨 DESIGN LANGUAGE

- **Black Glass Panels** - Semi-transparent overlays with blur
- **Neon Accents** - Electric blue (#00d4ff) and gold (#ffd700)
- **Smooth Animations** - Spring physics and easing curves
- **HUD Elements** - Scanlines, corner brackets, progress bars
- **Cinematic Typography** - Orbitron display font, Inter body

## 📊 CORE SYSTEMS

### Loadout State

Each build stores:

- Base Model
- 8 Attachment Slots
- Skin & Color Theme
- Stats (Stealth, Mobility, Power, Tech)
- Energy Usage
- Rarity Tier

### Stat Calculation

- Base stats from model
- Modifiers from attachments
- Real-time recalculation
- Energy capacity limits

### Persistence

- Zustand store with middleware
- Local storage sync
- Auto-save on changes
- Import/export builds (future)

## 🏆 ACHIEVEMENTS

- First Build - Create your first loadout
- Arsenal Builder - Create 5 loadouts
- Master Armorer - Create 10 loadouts
- Elite Agent - Reach level 5
- Legendary - Reach level 10

## 📝 LICENSE

MIT License - See LICENSE file for details

## 🎯 ROADMAP

- [ ] Three.js 3D previews
- [ ] Build comparison view
- [ ] Share builds via URL
- [ ] Export as image
- [ ] Audio feedback system
- [ ] More base models
- [ ] More attachments
- [ ] Preset templates
- [ ] Build randomizer

---

**CLASSIFIED** | **AGENT ARMORY** | **MISSION CONTROL SYSTEM**
