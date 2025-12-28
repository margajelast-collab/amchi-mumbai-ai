// Simple test to verify the translation service works
const { clientTranslationService } = require('./src/client/src/services/clientTranslationService.ts');

async function testTranslation() {
  console.log('Testing Mumbai Slang Translator...');
  
  try {
    // Test basic translation
    const result1 = await clientTranslationService.translate('bhai');
    console.log('Translation for "bhai":', result1);
    
    // Test suggestions
    const suggestions = await clientTranslationService.getSuggestions('ch');
    console.log('Suggestions for "ch":', suggestions);
    
    console.log('✅ Translation service is working!');
  } catch (error) {
    console.error('❌ Translation service error:', error);
  }
}

testTranslation();