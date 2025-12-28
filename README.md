# Mumbai Slang Translator 🏙️

A web app that helps you understand Mumbai slang and street language like a local!

## 🚀 Fixed: No More "Failed to fetch" Error!

The app now works completely **client-side** with embedded Mumbai slang dictionary. No backend server needed!

### What's Fixed:
- ✅ **No API calls** - Works entirely in the browser
- ✅ **Rich cultural context** - Based on authentic Mumbai culture
- ✅ **Smart suggestions** - Real-time search as you type
- ✅ **Offline support** - Works without internet
- ✅ **185+ slang terms** - Comprehensive Mumbai dictionary

### Test These Mumbai Slang Terms:
- **"bhai"** → "brother/friend" (everyday conversation)
- **"cutting chai"** → "half cup of tea" (food culture)  
- **"bindaas"** → "carefree/awesome" (street language)
- **"local"** → "Mumbai suburban train" (transport)
- **"mumbai spirit"** → "resilience mindset" (cultural identity)
- **"apna time aayega"** → "our time will come" (cultural belief)

![Mumbai Slang Translator](https://img.shields.io/badge/Mumbai-Slang%20Translator-orange)
![React](https://img.shields.io/badge/React-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## What is this?

This app translates Mumbai slang words and phrases into English. Perfect for tourists, new residents, or anyone who wants to understand what locals are saying!

**Examples:**
- "Bhidu" → "Friend/Buddy"
- "Kya scene hai?" → "What's the plan?"
- "Jhakaas" → "Awesome/Fantastic"
- "Tapri" → "Small tea stall"

## Features

✨ **185+ Mumbai Slang Terms** - From street language to corporate slang  
🔍 **Smart Search** - Get suggestions as you type  
📱 **Mobile Friendly** - Works great on phones  
🌐 **Offline Support** - Works even without internet  
🎨 **Mumbai-Inspired Design** - Beautiful UI with Mumbai colors and themes

## How to Use

1. **[🚀 Open the Web App](https://margajelast-collab.github.io/amchi-mumbai-ai/#/translate)** - Click to launch the translator
2. Type any Mumbai slang word or phrase
3. Click "Translate" 
4. Get the meaning with cultural context!

## Screenshots

*Coming soon - will add screenshots of the beautiful Mumbai-themed interface*

## Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Custom CSS with Mumbai-inspired design
- **Data:** JSON-based slang dictionary

## Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/margajelast-collab/amchi-mumbai-ai.git
cd amchi-mumbai-ai
```

2. **Install dependencies**
```bash
cd src/client && npm install
```

3. **Start the app**
```bash
npm start
```

4. **Open your browser**
- Frontend: http://localhost:3000

## Project Structure

```
amchi-mumbai-ai/
├── src/
│   └── client/          # React frontend application
├── data/                # Slang dictionary
└── README.md
```

## Contributing

We welcome contributions! Here's how you can help:

1. **Add new slang words** - Update `data/slang_dictionary.json`
2. **Fix bugs** - Check the issues tab
3. **Improve UI** - Make it even more beautiful
4. **Add features** - Voice input, favorites, etc.

### How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Slang Categories

Our dictionary includes:
- **Everyday Slang** - bhai, scene, mast, solid
- **Street Language** - bhidu, tapori, bindaas
- **Local Transport** - local, fast, virar fast
- **Food Culture** - cutting chai, tapri, paisa vasool
- **Modern Terms** - work ka scene, wfh scene
- **Cultural Identity** - mumbai spirit, apna time aayega

## Development

### Running Tests
```bash
cd src/client && npm test
```

### Building for Production
```bash
cd src/client && npm run build
```

### GitHub Pages Deployment
This app is deployed to GitHub Pages. To deploy updates:

1. **Build the React app:**
```bash
cd src/client
npm run build
cd ../..
```

2. **Copy build files to root:**
```bash
# Windows PowerShell
Copy-Item "src\client\build\*" -Destination "." -Recurse -Force

# Or use the deployment script
.\deploy-to-github-pages.ps1
```

3. **Commit and push changes:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

**Live URLs:**
- **Main app**: https://margajelast-collab.github.io/amchi-mumbai-ai/
- **Translator**: https://margajelast-collab.github.io/amchi-mumbai-ai/#/translate

**Troubleshooting:**
- If the app doesn't load, check GitHub repository Settings → Pages
- Ensure source is set to "Deploy from a branch" with branch `main` and folder `/ (root)`
- Wait 5-10 minutes after pushing for GitHub Pages to update
- Check that `.nojekyll` file exists in the root to disable Jekyll processing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the vibrant culture of Mumbai
- Thanks to all Mumbaikars who use this amazing slang daily
- Built with ❤️ for the city that never sleeps

## Support

If you like this project, please give it a ⭐ on GitHub!

For questions or suggestions, feel free to open an issue.

---

**Made with 🧡 in Mumbai** | **Jai Maharashtra!** 🚩