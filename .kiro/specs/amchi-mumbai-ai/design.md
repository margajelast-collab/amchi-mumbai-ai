# Design Document: Amchi Mumbai AI

## Overview

Amchi Mumbai AI is a web-based local guide application that serves as a comprehensive cultural and practical assistant for tourists visiting Mumbai. The system enables AI agents to understand, explain, and translate Mumbai-specific slang, habits, geography, and cultural nuances using localized context instead of generic interpretations.

The application integrates four core services: comprehensive Mumbai slang translation across multiple categories, Mumbai-specific street food recommendations, geography-aware traffic estimation, and authentic cultural guidance. All services maintain Mumbai's casual, fast-paced communication style mixing Hindi, Marathi, and English.

The application follows a microservices architecture with a React-based frontend and Node.js/Express backend services. Each core service is implemented as a separate module with Mumbai-context data management and culturally-aware API endpoints that always assume Mumbai context rather than pan-India interpretations.

## Architecture

The system uses a client-server architecture with the following layers:

### Frontend Layer
- **React Web Application**: Single-page application with Mumbai's fast-paced, casual design aesthetic
- **Responsive Design**: Mobile-first approach optimized for Mumbai's on-the-go lifestyle
- **Service Workers**: Offline functionality for cached Mumbai slang and cultural content
- **State Management**: Redux for application state with Mumbai context preservation

### Backend Layer
- **Express.js API Gateway**: Central routing with Mumbai-context request handling
- **Service Modules**: Independent modules for each core service maintaining Mumbai cultural authenticity
- **Authentication Middleware**: Session management with Mumbai cultural preferences tracking
- **Rate Limiting**: API protection using Mumbai's casual communication style for error messages

### Data Layer
- **MongoDB**: Primary database for dynamic content with Mumbai context preservation
- **JSON Files**: Static data storage for categorized Mumbai slang dictionary and cultural content
- **Local Data**: Self-contained traffic patterns and route data based on Mumbai geography
- **Caching Layer**: Redis for frequently accessed Mumbai-specific content

## Components and Interfaces

### Core Service Components

#### Mumbai Slang Translator Service
```typescript
interface MumbaiSlangTranslatorService {
  translatePhrase(phrase: string, category?: SlangCategory): Promise<MumbaiTranslationResult>
  getSuggestions(partialPhrase: string): Promise<string[]>
  addToDatabase(slang: string, translation: string, category: SlangCategory, culturalContext: string): Promise<void>
  getCategoryTerms(category: SlangCategory): Promise<SlangTerm[]>
}

interface MumbaiTranslationResult {
  originalPhrase: string
  translation: string
  culturalContext: string
  category: SlangCategory
  confidence: number
  dailyLifeExample: string
  alternatives?: string[]
}

enum SlangCategory {
  EVERYDAY = "everyday",           // bhai, boss, yaar, public, scene
  TAPORI_STREET = "tapori_street", // bindaas, chalu, dedh_shana, bhidu
  LOCAL_TRAVEL = "local_travel",   // virar_fast, footboard, rush_hai
  FOOD_CULTURE = "food_culture",   // vada_pav, cutting, khau_galli
  CORPORATE_MODERN = "corporate_modern", // work_ka_scene, bandwidth_nahi
  CULTURE_IDENTITY = "culture_identity"  // sobo, mumbai_spirit, apna_time_aayega
}
```

#### Mumbai Food Recommender Service
```typescript
interface MumbaiFoodRecommenderService {
  getRecommendations(preferences: MumbaiFoodPreferences): Promise<MumbaiFoodRecommendation[]>
  getLocationBasedFood(coordinates: Coordinates, area: MumbaiArea): Promise<MumbaiFoodRecommendation[]>
  filterByDiet(recommendations: MumbaiFoodRecommendation[], diet: DietaryRestriction[]): MumbaiFoodRecommendation[]
  searchByMumbaiTerms(foodTerms: string[]): Promise<MumbaiFoodRecommendation[]>
}

interface MumbaiFoodRecommendation {
  name: string
  mumbaiTerminology: string        // vada_pav, cutting, kadak_chai
  location: MumbaiLocation
  priceRange: MumbaiPriceRange     // paisa_vasool, ek_number
  safetyRating: number
  operatingHours: TimeRange
  popularItems: string[]
  dietaryInfo: DietaryRestriction[]
  foodStyle: MumbaiFoodStyle       // sukha, masaledar, chatakdaar
  culturalSignificance: string
}

enum MumbaiArea {
  SOBO = "sobo",                   // South Mumbai
  WESTERN_SUBURBS = "western_suburbs",
  CENTRAL_SUBURBS = "central_suburbs", 
  THANE = "thane",
  NAVI_MUMBAI = "navi_mumbai"
}

enum MumbaiFoodStyle {
  SUKHA = "sukha",                 // dry preparation
  MASALEDAR = "masaledar",         // spicy
  CHATAKDAAR = "chatakdaar"        // tangy
}
```

#### Mumbai Traffic Estimator Service
```typescript
interface MumbaiTrafficEstimatorService {
  estimateRoute(origin: Coordinates, destination: Coordinates, mumbaiContext: MumbaiArea[]): Promise<MumbaiRouteEstimate>
  getAlternativeRoutes(origin: Coordinates, destination: Coordinates): Promise<MumbaiRouteEstimate[]>
  updateTrafficPatterns(): Promise<void>
  getLocalTrainOptions(origin: Coordinates, destination: Coordinates): Promise<LocalTrainRoute[]>
  calculateBasedOnTimeAndArea(timeOfDay: string, area: MumbaiArea): MumbaiTrafficLevel
}

interface MumbaiRouteEstimate {
  estimatedTime: number
  distance: number
  trafficCondition: MumbaiTrafficLevel  // rush_hai, jam_hai, peak_time
  alternativeRoutes: MumbaiRoute[]
  localTrainOptions: LocalTrainRoute[]
  mumbaiTransportTerms: string[]        // virar_fast, share_auto, meter_se
  lastUpdated: Date
  basedOnLocalPatterns: boolean         // indicates self-contained calculation
}

interface LocalTrainRoute {
  line: string                          // Western, Central, Harbour
  trainType: string                     // fast, slow, virar_fast
  estimatedTime: number
  crowdLevel: string                    // rush_hai, chill, peak_time
  compartmentSuggestion: string         // first_class, general, ladies
  scheduleBasedEstimate: boolean        // indicates local schedule data
}

enum MumbaiTrafficLevel {
  CHILL = "chill",
  RUSH_HAI = "rush_hai",
  JAM_HAI = "jam_hai", 
  PEAK_TIME = "peak_time",
  BHAYANAK = "bhayanak"                 // extreme traffic
}
```

#### Mumbai Cultural Guide Service
```typescript
interface MumbaiCulturalGuideService {
  getCulturalInfo(topic: string, mumbaiContext: boolean): Promise<MumbaiCulturalContent>
  getLocationCulture(coordinates: Coordinates, area: MumbaiArea): Promise<MumbaiCulturalContent>
  getFestivalInfo(date: Date): Promise<MumbaiFestivalInfo[]>
  getLocalTrainEtiquette(): Promise<MumbaiCulturalContent>
  getBollywoodInfluence(topic: string): Promise<MumbaiCulturalContent>
  getCorporateOfficeNorms(): Promise<MumbaiCulturalContent>
}

interface MumbaiCulturalContent {
  title: string
  description: string
  practicalTips: string[]
  mumbaiSpirit: string[]               // mumbai_spirit, adjust_kar, life_jhingalala
  doAndDonts: { dos: string[], donts: string[] }
  relevantLocations?: MumbaiLocation[]
  culturalInfluences: CulturalInfluence[]
  communicationStyle: MumbaiCommunicationStyle
  youthSlang?: string[]                // Gen-Z Mumbai terms
}

interface CulturalInfluence {
  type: InfluenceType
  description: string
  examples: string[]
}

enum InfluenceType {
  LOCAL_TRAINS = "local_trains",
  STREET_CULTURE = "street_culture", 
  BOLLYWOOD = "bollywood",
  CORPORATE_OFFICES = "corporate_offices",
  YOUTH_GENZ = "youth_genz"
}

interface MumbaiCommunicationStyle {
  tone: string[]                       // casual, fast-paced, friendly, sarcastic
  languageMix: string[]               // Hindi, Marathi, English
  formalityLevel: string              // low
  preferredStyle: string              // example usage preferred
}
```

### API Layer
```typescript
interface MumbaiAPIController {
  // Mumbai slang translation endpoints
  POST /api/mumbai/translate: (phrase: string, category?: SlangCategory) => MumbaiTranslationResult
  GET /api/mumbai/suggestions: (query: string) => string[]
  GET /api/mumbai/slang/category: (category: SlangCategory) => SlangTerm[]
  
  // Mumbai food recommendation endpoints  
  POST /api/mumbai/food/recommendations: (preferences: MumbaiFoodPreferences) => MumbaiFoodRecommendation[]
  GET /api/mumbai/food/nearby: (lat: number, lng: number, area: MumbaiArea) => MumbaiFoodRecommendation[]
  GET /api/mumbai/food/search: (mumbaiTerms: string[]) => MumbaiFoodRecommendation[]
  
  // Mumbai traffic estimation endpoints
  POST /api/mumbai/traffic/estimate: (origin: Coordinates, destination: Coordinates, areas: MumbaiArea[]) => MumbaiRouteEstimate
  GET /api/mumbai/traffic/alternatives: (origin: Coordinates, destination: Coordinates) => MumbaiRouteEstimate[]
  GET /api/mumbai/traffic/local-trains: (origin: Coordinates, destination: Coordinates) => LocalTrainRoute[]
  
  // Mumbai cultural guide endpoints
  GET /api/mumbai/culture/info: (topic: string, mumbaiContext: boolean) => MumbaiCulturalContent
  GET /api/mumbai/culture/location: (lat: number, lng: number, area: MumbaiArea) => MumbaiCulturalContent
  GET /api/mumbai/culture/festivals: (date: string) => MumbaiFestivalInfo[]
  GET /api/mumbai/culture/local-train-etiquette: () => MumbaiCulturalContent
  GET /api/mumbai/culture/bollywood-influence: (topic: string) => MumbaiCulturalContent
}
```

## Data Models

### Core Data Structures

```typescript
interface MumbaiUser {
  sessionId: string
  preferences: MumbaiUserPreferences
  visitHistory: string[]
  mumbaiAreas: MumbaiArea[]
  preferredSlangCategories: SlangCategory[]
  createdAt: Date
}

interface MumbaiUserPreferences {
  dietaryRestrictions: DietaryRestriction[]
  spiceLevel: SpiceLevel
  budgetRange: MumbaiPriceRange
  culturalInterests: string[]
  communicationStyle: MumbaiCommunicationStyle
  preferredMumbaiAreas: MumbaiArea[]
}

interface MumbaiLocation {
  name: string
  coordinates: Coordinates
  address: string
  area: MumbaiArea
  mumbaiLandmark: string
  localTrainStation?: string
  culturalSignificance?: string
}

interface SlangTerm {
  term: string
  translation: string
  category: SlangCategory
  culturalContext: string
  dailyLifeExample: string
  relatedTerms: string[]
  mumbaiSpecific: boolean
}

enum MumbaiPriceRange {
  FOKAT = "fokat",                     // free
  SASTA = "sasta",                     // cheap
  PAISA_VASOOL = "paisa_vasool",       // worth the money
  EK_NUMBER = "ek_number",             // top quality/expensive
  BHAYANAK_MEHENGA = "bhayanak_mehenga" // extremely expensive
}

enum DietaryRestriction {
  VEGETARIAN = "vegetarian",
  VEGAN = "vegan", 
  JAIN = "jain",
  HALAL = "halal",
  NO_RESTRICTIONS = "none"
}
```

### Database Schema

#### MongoDB Collections
- **mumbai_users**: User sessions with Mumbai cultural preferences
- **usage_logs**: API usage tracking with Mumbai context analytics
- **food_ratings**: User feedback on Mumbai food recommendations
- **cultural_feedback**: User engagement with Mumbai cultural content
- **slang_usage**: Tracking of slang translation requests by category

#### Static Data Files
- **product.md**: Primary reference file containing all Mumbai slang categories, cultural context, and behavior rules
- **mumbai_slang_dictionary.json**: Categorized Mumbai slang terms with cultural context (generated from product.md)
  - everyday: bhai, boss, yaar, public, scene, mast, jhakaas, solid, pakka
  - tapori_street: bindaas, chalu, dedh_shana, pateli, tashan, chhapri, bhau
  - local_travel: virar_fast, footboard, rush_hai, peak_time, last_local
  - food_culture: vada_pav, cutting, kadak_chai, khau_galli, paisa_vasool
  - corporate_modern: work_ka_scene, bandwidth_nahi, loop_me_daal, wfh_scene
  - culture_identity: sobo, mumbai_spirit, apna_time_aayega, mumbai_meri_jaan
- **mumbai_cultural_content.json**: Cultural information with Mumbai influences
- **mumbai_food_database.json**: Street food vendor information with Mumbai terminology
- **mumbai_area_mapping.json**: Mumbai area and landmark data with local train stations
- **mumbai_traffic_patterns.json**: Local traffic patterns and route data (self-contained)
- **local_train_schedules.json**: Mumbai local train timing and route information

## Error Handling

### Error Response Format
```typescript
interface MumbaiErrorResponse {
  error: {
    code: string
    message: string
    mumbaiMessage: string            // Error in Mumbai casual style
    culturalContext?: string
    details?: any
  }
  timestamp: Date
  requestId: string
}
```

### Error Categories
- **ValidationError**: Invalid input parameters with Mumbai-style helpful suggestions
- **ServiceUnavailableError**: External API failures with Mumbai casual explanations
- **NotFoundError**: Requested resource not found with Mumbai context suggestions
- **RateLimitError**: API usage limits exceeded with friendly Mumbai-style messaging
- **InternalServerError**: Unexpected system errors with "tension nahi" reassurance

### Graceful Degradation with Mumbai Context
- Offline mode for cached Mumbai slang translations across all categories
- Fallback to static Mumbai food recommendations when location services fail
- Default Mumbai cultural content when specific queries fail
- Local traffic pattern estimation using time-based and area-based calculations when real-time data is unavailable
- Mumbai-style error messages: "Arre yaar, kuch gadbad hai" instead of formal error text

## Testing Strategy

The application will use a dual testing approach combining unit tests and property-based tests to ensure comprehensive coverage and correctness.

### Unit Testing
- **Component Tests**: React component rendering and interaction
- **Service Tests**: Individual service method validation
- **API Tests**: Endpoint request/response validation
- **Integration Tests**: Cross-service communication
- **Error Handling Tests**: Graceful failure scenarios

### Property-Based Testing
Property-based tests will validate universal properties using fast-check library for JavaScript/TypeScript. Each test will run a minimum of 100 iterations to ensure comprehensive input coverage.

**Test Configuration**:
- Library: fast-check for TypeScript
- Minimum iterations: 100 per property test
- Tag format: **Feature: amchi-mumbai-ai, Property {number}: {property_text}**

The testing strategy ensures both specific examples work correctly (unit tests) and that universal properties hold across all possible inputs (property tests), providing comprehensive validation of system correctness.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the enhanced Mumbai-specific requirements analysis, the following correctness properties must be validated through property-based testing:

### Property 1: Mumbai Context Assumption
*For any* input or query to the system, all interpretations and responses should use Mumbai-specific context rather than generic or pan-India meanings
**Validates: Requirements 1.6, 6.5, 7.1, 7.6**

### Property 2: Slang Translation with Cultural Context
*For any* valid Mumbai slang term from any category (everyday, tapori, travel, food, corporate, cultural), the translation should include both English meaning and Mumbai cultural context explanation
**Validates: Requirements 1.1, 1.5, 7.3, 7.5**

### Property 3: Slang Category Completeness
*For any* slang category (everyday, tapori_street, local_travel, food_culture, corporate_modern, culture_identity), the system should maintain terms specific to that category with proper categorization
**Validates: Requirements 1.4, 6.6**

### Property 4: Translation Error Handling with Mumbai Suggestions
*For any* invalid or unrecognized input phrase, the system should return Mumbai-context suggestions rather than formal dictionary definitions or generic error messages
**Validates: Requirements 1.3**

### Property 5: System Response Time Compliance
*For any* translation or traffic estimation request, the system should respond within the specified time limits (3 seconds for translation, 5 minutes for traffic updates)
**Validates: Requirements 1.2, 3.2**

### Property 6: Food Recommendation Minimum Count with Mumbai Terminology
*For any* valid food preference input, the system should return at least 3 recommendations using authentic Mumbai food terminology (vada_pav, cutting, khau_galli, etc.)
**Validates: Requirements 2.1**

### Property 7: Food Recommendation Data Completeness
*For any* food recommendation returned, it should contain all required Mumbai-specific fields: location with area references, popular items, safety ratings, price ranges using local terms (paisa_vasool, ek_number), and operating hours
**Validates: Requirements 2.2, 2.4**

### Property 8: Dietary Preference Filtering with Mumbai Terms
*For any* specified dietary restriction, all returned food recommendations should match that requirement and use Mumbai food culture terminology for descriptions
**Validates: Requirements 2.3**

### Property 9: Traffic Estimation with Mumbai Geography
*For any* valid route request within Mumbai areas (SoBo, Western Suburbs, Central Suburbs, Thane, Navi Mumbai), the system should return travel time estimates considering Mumbai-specific factors
**Validates: Requirements 3.1, 3.4**

### Property 10: Alternative Routes with Mumbai Transport Options
*For any* traffic estimate response, it should include alternative route suggestions incorporating Mumbai transport options (local trains, share_auto, meter_se)
**Validates: Requirements 3.3**

### Property 11: Cultural Content Mumbai Influence Coverage
*For any* cultural information request, the returned content should include insights influenced by Mumbai's key cultural factors: local trains, street culture, Bollywood, corporate offices, and youth speech
**Validates: Requirements 4.1, 4.3**

### Property 12: Location-Based Cultural Relevance
*For any* location-specific cultural query within Mumbai areas, the returned content should be relevant to the specified Mumbai geographic area (SoBo, Western Suburbs, etc.)
**Validates: Requirements 4.4**

### Property 13: Cultural Content Practical Tips with Mumbai Terminology
*For any* cultural content returned, it should include practical tips using Mumbai cultural terminology and references
**Validates: Requirements 4.2**

### Property 14: Cross-Browser Compatibility with Mumbai Context
*For any* major web browser (Chrome, Firefox, Safari), the application should function correctly while maintaining Mumbai context throughout the user experience
**Validates: Requirements 5.4**

### Property 15: Offline Mumbai Content Accessibility
*For any* cached Mumbai slang or cultural content, it should remain accessible and functional when network connectivity fails
**Validates: Requirements 5.5**

### Property 16: User Interaction Logging with Mumbai Context
*For any* user interaction with the system, it should generate a corresponding log entry that preserves Mumbai cultural context and usage patterns
**Validates: Requirements 6.1**

### Property 17: Mumbai Cultural Preference Encryption
*For any* user preference data containing Mumbai cultural settings, it should be encrypted during storage while preserving the cultural preference structure
**Validates: Requirements 6.2**

### Property 18: Mumbai Content Update Frequency
*For any* Mumbai-specific content (slang dictionary, food database, cultural content), it should be updated within the specified weekly timeframe to maintain authenticity
**Validates: Requirements 6.3**

### Property 19: Error Handling Data Integrity
*For any* system error condition, the Mumbai context data state should remain consistent and not become corrupted
**Validates: Requirements 6.4**