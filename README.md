# Mumbai Slang Translator 🏙️

A web app that helps you understand Mumbai slang and street language like a local!

![Mumbai Slang Translator](https://img.shields.io/badge/Mumbai-Slang%20Translator-orange)
![React](https://img.shields.io/badge/React-18.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)

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

1. Visit the website
2. Type any Mumbai slang word or phrase
3. Click "Translate" 
4. Get the meaning with cultural context!

## Screenshots

*Coming soon - will add screenshots of the beautiful Mumbai-themed interface*

## Tech Stack

- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express
- **Styling:** Custom CSS with Mumbai-inspired design
- **Data:** JSON-based slang dictionary

## Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mumbai-slang-translator.git
cd mumbai-slang-translator
```

2. **Install dependencies**
```bash
npm install
cd src/client && npm install
```

3. **Start the app**
```bash
npm run dev
```

4. **Open your browser**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Project Structure

```
mumbai-slang-translator/
├── src/
│   ├── client/          # React frontend
│   ├── server/          # Node.js backend
│   └── shared/          # Shared code
├── data/                # Slang dictionary
├── scripts/             # Build scripts
└── README.md
```

## API Endpoints

- `POST /api/translate` - Translate slang to English
- `GET /api/suggestions` - Get word suggestions

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
npm test
```

### Building for Production
```bash
npm run build
```

### Environment Variables
Create a `.env` file:
```
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

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