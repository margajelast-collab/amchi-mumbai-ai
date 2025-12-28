const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Load slang dictionary
let slangDictionary = null;
try {
  const dictionaryPath = path.join(__dirname, 'data', 'slang_dictionary.json');
  const fileContent = fs.readFileSync(dictionaryPath, 'utf-8');
  slangDictionary = JSON.parse(fileContent);
  console.log(`Loaded slang dictionary with ${slangDictionary.metadata.total_entries} entries`);
} catch (error) {
  console.error('Error loading slang dictionary:', error);
}

// Helper function to find matches in dictionary
function findMatches(phrase) {
  if (!slangDictionary) {
    return { exact: [], partial: [] };
  }

  const normalizedPhrase = phrase.toLowerCase().trim();
  const exact = [];
  const partial = [];

  for (const key of Object.keys(slangDictionary.entries)) {
    const normalizedKey = key.toLowerCase().trim();
    
    if (normalizedKey === normalizedPhrase) {
      exact.push(key);
    } else if (normalizedKey.includes(normalizedPhrase) || normalizedPhrase.includes(normalizedKey)) {
      partial.push(key);
    }
  }

  return { exact, partial };
}

// Helper function to calculate confidence
function calculateConfidence(originalPhrase, matchedKey) {
  const normalizedOriginal = originalPhrase.toLowerCase().trim();
  const normalizedKey = matchedKey.toLowerCase().trim();
  
  if (normalizedOriginal === normalizedKey) {
    return 1.0; // Exact match
  }
  
  // Simple similarity calculation
  const similarity = 1 - (Math.abs(normalizedOriginal.length - normalizedKey.length) / Math.max(normalizedOriginal.length, normalizedKey.length));
  return Math.max(0.5, similarity);
}

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Mock API endpoints for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/translate', (req, res) => {
  const { phrase } = req.body;
  
  if (!phrase || phrase.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: { message: 'Phrase cannot be empty' }
    });
  }

  if (!slangDictionary) {
    return res.status(500).json({
      success: false,
      error: { message: 'Slang dictionary not loaded' }
    });
  }

  const matches = findMatches(phrase);
  
  // Handle exact matches
  if (matches.exact.length > 0) {
    const matchedKey = matches.exact[0];
    const translation = slangDictionary.entries[matchedKey];
    const confidence = calculateConfidence(phrase, matchedKey);
    
    const result = {
      originalPhrase: phrase,
      translation,
      confidence,
      alternatives: matches.exact.slice(1).map(key => slangDictionary.entries[key])
    };
    
    return res.json({
      success: true,
      data: result,
      timestamp: new Date(),
      requestId: Math.random().toString(36).substring(7)
    });
  }

  // Handle partial matches
  if (matches.partial.length > 0) {
    const bestMatch = matches.partial[0];
    const translation = slangDictionary.entries[bestMatch];
    const confidence = calculateConfidence(phrase, bestMatch);
    
    const result = {
      originalPhrase: phrase,
      translation: `Possible match: ${translation}`,
      confidence,
      alternatives: matches.partial.slice(1).map(key => slangDictionary.entries[key])
    };
    
    return res.json({
      success: true,
      data: result,
      timestamp: new Date(),
      requestId: Math.random().toString(36).substring(7)
    });
  }

  // No matches found
  const result = {
    originalPhrase: phrase,
    translation: 'Translation not found',
    confidence: 0,
    alternatives: []
  };
  
  res.json({
    success: true,
    data: result,
    timestamp: new Date(),
    requestId: Math.random().toString(36).substring(7)
  });
});

app.get('/api/suggestions', (req, res) => {
  const { query } = req.query;
  
  if (!query || query.trim().length === 0) {
    return res.json({
      success: true,
      data: [],
      timestamp: new Date(),
      requestId: Math.random().toString(36).substring(7)
    });
  }

  if (!slangDictionary) {
    return res.status(500).json({
      success: false,
      error: { message: 'Slang dictionary not loaded' }
    });
  }

  const normalizedQuery = query.toLowerCase().trim();
  const suggestions = [];

  // Find keys that start with or contain the query
  for (const key of Object.keys(slangDictionary.entries)) {
    const normalizedKey = key.toLowerCase();
    
    if (normalizedKey.startsWith(normalizedQuery) || 
        normalizedKey.includes(normalizedQuery)) {
      suggestions.push(key);
    }
  }

  // Sort by relevance (exact prefix matches first, then contains matches)
  suggestions.sort((a, b) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    const aStartsWith = aLower.startsWith(normalizedQuery);
    const bStartsWith = bLower.startsWith(normalizedQuery);
    
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    
    return a.length - b.length; // Shorter matches first
  });

  // Return top 10 suggestions
  res.json({
    success: true,
    data: suggestions.slice(0, 10),
    timestamp: new Date(),
    requestId: Math.random().toString(36).substring(7)
  });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('API endpoints available:');
  console.log('- GET /api/health');
  console.log('- POST /api/translate');
  console.log('- GET /api/suggestions');
});