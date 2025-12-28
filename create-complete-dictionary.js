// Script to create complete Mumbai slang dictionary from JSON
const fs = require('fs');

// Read the original JSON file
const slangData = JSON.parse(fs.readFileSync('data/slang_dictionary.json', 'utf8'));

// Category mapping based on content analysis
const categoryMapping = {
  // Everyday conversation
  'arrey': 'everyday', 'bhai': 'everyday', 'yaar': 'everyday', 'scene': 'everyday', 'scene hai': 'everyday',
  'kya scene hai': 'everyday', 'mast': 'everyday', 'jhakaas': 'everyday', 'solid': 'everyday', 'pakka': 'everyday',
  'chill maar': 'everyday', 'tension nahi': 'everyday', 'timepass': 'everyday', 'setting': 'everyday',
  'sorted': 'everyday', 'fokat': 'everyday', 'lafda': 'everyday', 'panga': 'everyday', 'pakau': 'everyday',
  'kaiko': 'everyday', 'apun': 'everyday', 'tereko': 'everyday', 'mereko': 'everyday', 'public': 'everyday',
  'boss': 'everyday',

  // Street/Tapori language
  'bhidu': 'tapori_street', 'bindaas': 'tapori_street', 'tapori': 'tapori_street', 'jugaad': 'tapori_street',
  'chalu': 'tapori_street', 'chindi': 'tapori_street', 'dedh shana': 'tapori_street', 'pateli': 'tapori_street',
  'tashan': 'tapori_street', 'chhapri': 'tapori_street', 'bhau': 'tapori_street', 'khallas': 'tapori_street',
  'vaat lagna': 'tapori_street', 'fattu': 'tapori_street', 'phodu': 'tapori_street', 'bhaav mat de': 'tapori_street',
  'chaska': 'tapori_street', 'jhol': 'tapori_street', 'bhayanak': 'tapori_street', 'ghanta': 'tapori_street',

  // Local transport
  'local': 'local_travel', 'fast': 'local_travel', 'slow': 'local_travel', 'virar fast': 'local_travel',
  'andhar chalo': 'local_travel', 'utrega kya': 'local_travel', 'footboard': 'local_travel', 'rush hai': 'local_travel',
  'peak time': 'local_travel', 'signal gaya': 'local_travel', 'jam hai': 'local_travel', 'share auto': 'local_travel',
  'meter se': 'local_travel', 'auto mana': 'local_travel', 'last local': 'local_travel', 'first class': 'local_travel',

  // Food culture
  'cutting': 'food_culture', 'cutting chai': 'food_culture', 'tapri': 'food_culture', 'vada pav': 'food_culture',
  'bhel': 'food_culture', 'maska': 'food_culture', 'kadak chai': 'food_culture', 'ek number': 'food_culture',
  'butter pav': 'food_culture', 'sukha': 'food_culture', 'extra chutney': 'food_culture', 'khau galli': 'food_culture',
  'masaledar': 'food_culture', 'chatakdaar': 'food_culture', 'pet pooja': 'food_culture', 'paisa vasool': 'food_culture',
  'pani puri': 'food_culture', 'sev puri': 'food_culture', 'dahi puri': 'food_culture', 'ragda pattice': 'food_culture',
  'misal pav': 'food_culture', 'pau bhaji': 'food_culture', 'kanda poha': 'food_culture', 'upma': 'food_culture',
  'idli': 'food_culture', 'dosa': 'food_culture', 'sambar': 'food_culture', 'rasam': 'food_culture',
  'curd rice': 'food_culture', 'thali': 'food_culture', 'dabba': 'food_culture', 'khana': 'food_culture',
  'paani': 'food_culture', 'chai': 'food_culture', 'coffee': 'food_culture', 'lassi': 'food_culture',
  'nimbu paani': 'food_culture', 'sugarcane juice': 'food_culture', 'kokum': 'food_culture', 'solkadhi': 'food_culture',
  'aamras': 'food_culture', 'kulfi': 'food_culture', 'falooda': 'food_culture', 'jalebi': 'food_culture',
  'gulab jamun': 'food_culture', 'rasgulla': 'food_culture', 'modak': 'food_culture', 'puran poli': 'food_culture',
  'shrikhand': 'food_culture', 'basundi': 'food_culture', 'aamti': 'food_culture', 'bhakri': 'food_culture',
  'zunka': 'food_culture', 'pitla': 'food_culture', 'bharli vangi': 'food_culture', 'koliwada': 'food_culture',
  'bombil': 'food_culture', 'pomfret': 'food_culture', 'kingfish': 'food_culture', 'prawn': 'food_culture',
  'crab': 'food_culture', 'usal': 'food_culture', 'thalipeeth': 'food_culture', 'dhokla': 'food_culture',
  'khandvi': 'food_culture', 'fafda': 'food_culture', 'gathiya': 'food_culture', 'chevda': 'food_culture',
  'chakli': 'food_culture', 'murukku': 'food_culture', 'banana chips': 'food_culture', 'jackfruit chips': 'food_culture',
  'coconut barfi': 'food_culture', 'cashew barfi': 'food_culture', 'kaju katli': 'food_culture', 'besan laddu': 'food_culture',
  'rava laddu': 'food_culture', 'motichoor laddu': 'food_culture', 'boondi': 'food_culture', 'soan papdi': 'food_culture',
  'mysore pak': 'food_culture', 'halwa': 'food_culture', 'kheer': 'food_culture', 'payasam': 'food_culture',
  'sandesh': 'food_culture', 'mishti doi': 'food_culture', 'roshogolla': 'food_culture', 'cham cham': 'food_culture',
  'kalakand': 'food_culture', 'peda': 'food_culture', 'malpua': 'food_culture', 'rabri': 'food_culture',
  'thandai': 'food_culture', 'badam milk': 'food_culture', 'kesar milk': 'food_culture', 'masala chai': 'food_culture',
  'irani chai': 'food_culture', 'filter coffee': 'food_culture', 'kaapi': 'food_culture', 'bun maska': 'food_culture',
  'khari biscuit': 'food_culture', 'osmania biscuit': 'food_culture', 'rusk': 'food_culture', 'toast': 'food_culture',
  'sandwich': 'food_culture', 'club sandwich': 'food_culture', 'grilled sandwich': 'food_culture', 'cheese toast': 'food_culture',
  'jam': 'food_culture', 'honey': 'food_culture', 'ghee': 'food_culture', 'oil': 'food_culture',
  'masala': 'food_culture', 'garam masala': 'food_culture', 'chaat masala': 'food_culture', 'red chili powder': 'food_culture',
  'turmeric': 'food_culture', 'coriander': 'food_culture', 'cumin': 'food_culture',

  // Corporate/Modern
  'work ka scene': 'corporate_modern', 'client ka lafda': 'corporate_modern', 'deadline tight': 'corporate_modern',
  'escalation gaya': 'corporate_modern', 'on call': 'corporate_modern', 'loop me daal': 'corporate_modern',
  'revert kar': 'corporate_modern', 'bandwidth nahi': 'corporate_modern', 'wfh scene': 'corporate_modern',
  'office grind': 'corporate_modern', 'sorted scene': 'corporate_modern', 'cancel scene': 'corporate_modern',
  'vibe match': 'corporate_modern', 'ghost kar diya': 'corporate_modern', 'sutta break': 'corporate_modern',

  // Cultural identity
  'mumbai spirit': 'culture_identity', 'apna time aayega': 'culture_identity', 'mumbai meri jaan': 'culture_identity',
  'sobo': 'culture_identity', 'bandra vibe': 'culture_identity', 'kurla crowd': 'culture_identity',
  'peak mumbai': 'culture_identity', 'life jhingalala': 'culture_identity', 'adjust kar': 'culture_identity',
  'chawl': 'culture_identity', 'galli': 'culture_identity',

  // Family terms
  'dada': 'family_terms', 'tai': 'family_terms', 'mama': 'family_terms', 'kaka': 'family_terms',
  'aai': 'family_terms', 'baba': 'family_terms'
};

// Generate cultural context based on category
function generateCulturalContext(term, translation, category) {
  const contextTemplates = {
    everyday: `Common Mumbai expression used in daily conversations. Reflects the city's friendly, casual communication style.`,
    tapori_street: `Classic Mumbai street language that shows the city's street-smart culture. Popular in local areas and Bollywood movies.`,
    local_travel: `Essential Mumbai transport terminology. The local train system is the lifeline of the city, connecting millions daily.`,
    food_culture: `Part of Mumbai's rich food culture. The city's street food and dining habits are legendary across India.`,
    corporate_modern: `Modern Mumbai corporate slang mixing English and Hindi. Shows how the city adapts global business culture locally.`,
    culture_identity: `Represents Mumbai's unique cultural identity and spirit. Embodies the city's resilience and optimistic attitude.`,
    family_terms: `Traditional family relationship terms used in Mumbai's diverse communities, showing respect and cultural values.`
  };

  // Special cases with specific cultural context
  const specialContexts = {
    'vada pav': 'Mumbai\'s most iconic street food, often called the "burger of Mumbai". A must-try for any visitor and daily food for locals!',
    'local': 'The lifeline of Mumbai - suburban trains that connect the entire city. Peak hours can be extremely crowded but essential for daily commute.',
    'cutting chai': 'A uniquely Mumbai way to order tea - half a cup, perfect for sharing or when you want just a sip. Reflects Mumbai\'s community culture.',
    'tapri': 'Small roadside tea stalls found on every Mumbai street corner, perfect for quick chai and gossip. Heart of Mumbai\'s social life.',
    'bhidu': 'Classic Mumbai tapori (street-smart) way to address a friend. Made famous by Bollywood movies and embodies Mumbai\'s street culture.',
    'bindaas': 'Embodies the Mumbai spirit - being carefree and confident despite life\'s challenges. Core to Mumbai\'s resilient attitude.',
    'jugaad': 'The Mumbai way of finding creative solutions to problems with limited resources. Reflects the city\'s innovative survival spirit.',
    'mumbai spirit': 'The resilient, never-give-up attitude that Mumbaikars are famous for. Embodies the city\'s ability to bounce back from challenges.',
    'apna time aayega': 'Popular phrase meaning "our time will come" - reflects Mumbai\'s optimistic spirit and belief in eventual success despite struggles.',
    'sobo': 'South Mumbai - the posh area known for its colonial architecture and upscale lifestyle. Represents Mumbai\'s aspirational culture.',
    'virar fast': 'The most crowded train route in Mumbai, a true test of survival skills! Legendary among Mumbaikars for its intensity.',
    'paisa vasool': 'Mumbai\'s practical approach to spending - everything must give good value. Reflects the city\'s cost-conscious but quality-appreciating nature.'
  };

  return specialContexts[term] || contextTemplates[category] || contextTemplates.everyday;
}

// Generate examples
function generateExamples(term, translation) {
  const commonExamples = {
    'bhai': ['Bhai, kya scene hai? (Brother, what\'s the plan?)', 'Bhai sahab, help kar na! (Brother, please help!)'],
    'scene': ['Kya scene hai aaj? (What\'s the plan today?)', 'Movie ka scene hai kya? (Are we watching a movie?)'],
    'mast': ['Yeh chai mast hai! (This tea is awesome!)', 'Mast weather hai aaj! (Great weather today!)'],
    'local': ['Local pakad ke office jaunga (I\'ll catch the local train to office)', 'Local mein bahut rush hai (The local train is very crowded)'],
    'cutting': ['Ek cutting chai dena (Give me half a cup of tea)', 'Cutting peeke jaate hai (Let\'s have some tea and go)'],
    'bindaas': ['Bindaas jao, tension mat lo (Go carefree, don\'t worry)', 'Woh bindaas ladka hai (He\'s a carefree guy)']
  };

  return commonExamples[term] || [
    `"${term}" is commonly used in Mumbai conversations`,
    `You might hear "${term}" in local trains or street conversations`
  ];
}

// Create the complete dictionary
let dictionaryContent = `// Mumbai Slang Dictionary Data - Complete Version
// This file contains ALL 185+ slang terms with their translations and cultural context

export interface SlangEntry {
  translation: string;
  category: string;
  culturalContext: string;
  examples: string[];
}

export interface SlangDictionary {
  [key: string]: SlangEntry;
}

// Complete Mumbai Slang Dictionary with all terms from the original JSON
export const mumbaiSlangDictionary: SlangDictionary = {
`;

// Process each entry from the JSON
Object.entries(slangData.entries).forEach(([term, translation]) => {
  const category = categoryMapping[term] || 'everyday';
  const culturalContext = generateCulturalContext(term, translation, category);
  const examples = generateExamples(term, translation);
  
  dictionaryContent += `  "${term}": {
    translation: "${translation}",
    category: "${category}",
    culturalContext: "${culturalContext.replace(/"/g, '\\"')}",
    examples: ${JSON.stringify(examples)}
  },
`;
});

dictionaryContent += `};

export const slangCategories = {
  "everyday": "Everyday conversation",
  "tapori_street": "Street/Tapori language", 
  "local_travel": "Local transport",
  "food_culture": "Food culture",
  "corporate_modern": "Modern corporate",
  "culture_identity": "Cultural identity",
  "family_terms": "Family terms"
};

export const metadata = {
  version: "3.0.0",
  last_updated: "2024-12-28",
  total_entries: ${Object.keys(slangData.entries).length},
  categories: Object.keys(slangCategories),
  description: "Complete Mumbai slang dictionary with all 185+ terms and authentic cultural context"
};`;

// Write the complete dictionary file
fs.writeFileSync('src/client/src/data/slangDictionary.ts', dictionaryContent);

console.log(`✅ Created complete dictionary with ${Object.keys(slangData.entries).length} terms!`);
console.log('Dictionary saved to: src/client/src/data/slangDictionary.ts');