# Na3eeman Landing Page

A bilingual (Arabic/English) landing page for Na3eeman - a Jordanian barber booking platform.

## 🚀 Features

- **Bilingual Support**: Full Arabic (RTL) and English (LTR) with language toggle
- **Responsive Design**: Mobile-first, works on all devices
- **Animations**: Smooth Framer Motion animations and scroll effects
- **Modern Stack**: React 18 + Vite + Tailwind CSS
- **Jordanian Aesthetic**: Purple, orange, and gold color scheme
- **Performance**: Optimized with lazy loading and code splitting

## 📦 Installation

```bash
# Navigate to the project directory
cd na3eeman_web

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## 🛠️ Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
na3eeman_web/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation bar with language toggle
│   │   ├── Hero.jsx             # Hero section with phone mockup
│   │   ├── Features.jsx         # 6 feature cards
│   │   ├── HowItWorks.jsx       # 3-step process
│   │   ├── Testimonials.jsx     # Customer reviews + stats
│   │   ├── DownloadSection.jsx  # App download with QR code
│   │   └── Footer.jsx           # Footer with links
│   ├── hooks/
│   │   └── useLanguage.js       # Language management hook
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles + Tailwind
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js               # Vite configuration
└── postcss.config.js            # PostCSS configuration
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  primary: '#6B46C1',    // Purple
  secondary: '#DD6B20',  // Orange
  gold: '#D4AF37',       // Gold
}
```

### Translations

Edit `src/hooks/useLanguage.js` to add/modify translations:

```js
const translations = {
  ar: { /* Arabic translations */ },
  en: { /* English translations */ },
};
```

### Content

Each component is self-contained. Modify the component files in `src/components/` to update content.

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Manual

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Technology Stack

- **React 18**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Intersection Observer**: Scroll animations

## 📄 License

© 2026 Na3eeman - All Rights Reserved

## 🇯🇴 Made in Jordan

Built with ❤️ in Amman, Jordan

---

## 🐛 Troubleshooting

### Port already in use

If port 3000 is occupied, edit `vite.config.js`:

```js
server: {
  port: 3001, // Change to any available port
}
```

### Styles not loading

Make sure Tailwind is properly installed:

```bash
npm install -D tailwindcss postcss autoprefixer
```

### Language not persisting

The language preference is saved in `localStorage`. Clear browser cache if experiencing issues.

## 📞 Support

For questions or issues, contact: <info@na3eeman.jo>
