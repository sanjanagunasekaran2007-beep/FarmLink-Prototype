import { ChatbotTopicResponse, ChatAction } from '@/types';

export interface ChatLanguageOption {
  code: 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn';
  name: string;
  native: string;
  greeting: string;
  isFullySupported: boolean;
}

export const CHATBOT_LANGUAGES: ChatLanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    native: 'English',
    greeting: "Vanakkam! I'm FarmLink AI, your agricultural assistant. How can I help you with your farming or marketplace needs today?",
    isFullySupported: true,
  },
  {
    code: 'ta',
    name: 'Tamil',
    native: 'தமிழ்',
    greeting: 'வணக்கம்! நான் ஃபார்ம்லிங்க் AI. உங்கள் பயிர் அறுவடை, விலை நிலவரம் அல்லது வாங்குபவர்கள் பற்றி நான் எவ்வாறு உதவ முடியும்?',
    isFullySupported: true,
  },
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    greeting: 'नमस्ते! मैं फार्मलिंक AI हूँ। आज मैं आपकी फसल, मंडी भाव या खरीदार खोजने में कैसे मदद कर सकता हूँ?',
    isFullySupported: true,
  },
  {
    code: 'te',
    name: 'Telugu',
    native: 'తెలుగు',
    greeting: 'నమస్కారం! నేను ఫామ్‌లింక్ AI. పంట అమ్మకాలు, మార్కెట్ ధరలు లేదా ఆర్డర్ వివరాల్లో మీకు ఎలా సహాయపడగలను?',
    isFullySupported: false,
  },
  {
    code: 'ml',
    name: 'Malayalam',
    native: 'മലയാളം',
    greeting: 'നമസ്കാരം! ഞാൻ ഫാംലിങ്ക് AI ആണ്. നിങ്ങളുടെ വിളവെടുപ്പ്, മാർക്കറ്റ് വിലകൾ അല്ലെങ്കിൽ ഓർഡറുകൾ എന്നിവയിൽ എങ്ങനെ സഹായിക്കണം?',
    isFullySupported: false,
  },
  {
    code: 'kn',
    name: 'Kannada',
    native: 'ಕನ್ನಡ',
    greeting: 'ನಮಸ್ಕಾರ! ನಾನು ಫಾರ್ಮ್‌ಲಿಂಕ್ AI. ನಿಮ್ಮ ಬೆಳೆ ವಿವರ, ಮಂಡಿ ಬೆಲೆ ಅಥವಾ ಖರೀದಿದಾರರ ಸಂಪರ್ಕದಲ್ಲಿ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    isFullySupported: false,
  },
];

export const SUGGESTED_QUESTIONS = [
  'How do I add my harvest?',
  'How do I find a harvest?',
  'How do I save a harvest?',
  'How do I submit an interest request?',
  'How can I find buyers?',
  'How do I check market prices?',
  'How can I track my order?',
  'How do I update delivery status?',
  'How do I complete a proof of delivery?',
  'What do the route distance values mean?',
  'Where can I view my transactions?',
  'What should I check before harvesting tomatoes?',
  'How do I update my farm details?',
];


export const QUICK_ACTIONS: { label: string; prompt: string; action?: ChatAction }[] = [
  {
    label: '+ Add Harvest',
    prompt: 'How do I add my harvest listing?',
    action: { label: 'Open Add Harvest', actionType: 'open_add_harvest' },
  },
  {
    label: 'Market Prices',
    prompt: 'Show me today\'s mandi market prices',
    action: { label: 'View Market Prices', actionType: 'navigate', targetTab: 'market' },
  },
  {
    label: 'Find Buyers',
    prompt: 'How can I discover verified wholesale buyers?',
    action: { label: 'Find Buyers', actionType: 'navigate', targetTab: 'buyers' },
  },
  {
    label: 'Track Orders',
    prompt: 'How do I track my active delivery orders?',
    action: { label: 'Track Orders', actionType: 'navigate', targetTab: 'deliveries' },
  },
  {
    label: 'Payment Help',
    prompt: 'Explain how escrow payments work and my payment status',
    action: { label: 'View Payments', actionType: 'navigate', targetTab: 'payments' },
  },
];

export const PREDEFINED_TOPICS: ChatbotTopicResponse[] = [
  // 1. Add Harvest
  {
    id: 'add-harvest',
    keywords: ['add harvest', 'list harvest', 'sell crop', 'new listing', 'list produce', 'post harvest', 'how to add', 'add crop'],
    category: 'Harvest Listing',
    title: 'Adding a Harvest Listing',
    content: {
      en: `To add a harvest listing on FarmLink:
• Tap the "+ Add Harvest" button on your dashboard or header.
• Choose your crop name, variety, and quality grade (Grade A, B, or C).
• Enter the available quantity (in kg, quintals, or crates) and your expected price.
• Specify your harvest readiness date and farm pickup location.
• You can publish immediately to verified buyers or save it as a draft to review later.`,
      ta: `ஃபார்ம்லிங்கில் உங்கள் அறுவடையைப் பட்டியலிட:
• "+ Add Harvest" பொத்தானைத் தட்டவும்.
• பயிர் பெயர், ரகம் மற்றும் தரத்தைத் தேர்ந்தெடுக்கவும்.
• அளவு மற்றும் எதிர்பார்க்கும் விலையை உள்ளிடவும்.
• அறுவடைத் தேதி மற்றும் பண்ணை இருப்பிடத்தைக் குறிப்பிடவும்.
• உடனே வெளியிடலாம் அல்லது வரைவாக (Draft) சேமிக்கலாம்.`,
      hi: `फार्मलिंक पर अपनी फसल लिस्ट करने के लिए:
• "+ Add Harvest" बटन पर टैप करें।
• फसल का नाम, किस्म और गुणवत्ता ग्रेड चुनें।
• मात्रा और अपेक्षित मूल्य दर्ज करें।
• फसल तैयार होने की तिथि और पिकअप स्थान दर्ज करें।
• तुरंत प्रकाशित करें या बाद में ड्राफ्ट के रूप में सहेजें।`,
    },
    actions: [
      { label: 'Open Add Harvest', actionType: 'open_add_harvest' },
      { label: 'View My Harvests', actionType: 'navigate', targetTab: 'harvest' },
    ],
  },

  // 2. Market Prices
  {
    id: 'market-prices',
    keywords: ['market price', 'mandi rate', 'price today', 'apmc rate', 'crop rate', 'today price', 'spot price', 'price trend', 'check price'],
    category: 'Market Intelligence',
    title: 'Checking Market & APMC Spot Prices',
    content: {
      en: `You can monitor live agricultural prices across regional APMC Mandis:
• Navigate to the "Market Prices" tab to view real-time modal, minimum, and maximum rates.
• Filter prices by crop category (Vegetables, Grains, Fruits, Spices).
• Check 7-day price history graphs and arrival volumes.
• Compare nearby mandis to see which market offers higher net realizations for your produce.`,
      ta: `மண்டி சந்தை விலைகளை அறிய:
• "Market Prices" பகுதிக்குச் செல்லவும்.
• காய்கறிகள், தானியங்கள் வாரியாக இன்றைய மாடல் விலையைப் பார்க்கவும்.
• 7 நாள் விலை மாற்றங்கள் மற்றும் அருகிலுள்ள சந்தை ஒப்பீடுகளைப் பார்வையிடவும்.`,
      hi: `मंडी भाव जानने के लिए:
• "Market Prices" टैब पर जाएं।
• अपनी फसलों के आज के न्यूनतम, अधिकतम और मॉडल भाव देखें।
• 7-दिवसीय मूल्य रुझान और नजदीकी मंडियों की तुलना करें।`,
    },
    actions: [
      { label: 'View Market Prices', actionType: 'navigate', targetTab: 'market' },
    ],
  },

  // 3. Find Buyers
  {
    id: 'find-buyers',
    keywords: ['find buyer', 'discover buyer', 'buyer list', 'wholesale buyer', 'food processor', 'sell to buyer', 'buyer interest', 'contact buyer'],
    category: 'Buyer Discovery',
    title: 'Connecting with Verified Buyers',
    content: {
      en: `FarmLink connects you directly with verified wholesale buyers, retailers, and food processors:
• Open the "Find Buyers" tab to browse active purchasing requirements.
• Filter buyers by crop type, location/state, or order volume (Small, Medium, Bulk).
• Tap "Express Interest" on any buyer card to send your lot details and preferred collection date.
• Once accepted, an escrow-backed purchase order is generated.`,
      ta: `வாங்குபவர்களுடன் இணைய:
• "Find Buyers" பகுதிக்குச் செல்லவும்.
• மொத்த வியாபாரிகள் மற்றும் உணவு நிறுவனங்களின் தேவைகளைப் பார்க்கவும்.
• "Express Interest" மூலம் உங்கள் அறுவடை விவரங்களை அனுப்பவும்.`,
      hi: `सत्यापित खरीदार खोजने के लिए:
• "Find Buyers" टैब पर जाएं।
• थोक खरीदारों, खुदरा विक्रेताओं और फूड प्रोसेसर्स की मांग देखें।
• "Express Interest" दबाकर अपनी फसल की जानकारी भेजें।`,
    },
    actions: [
      { label: 'Browse Verified Buyers', actionType: 'navigate', targetTab: 'buyers' },
    ],
  },

  // 4. My Harvest Management
  {
    id: 'my-harvest',
    keywords: ['my harvest', 'my listings', 'edit harvest', 'delete harvest', 'draft listing', 'manage listing', 'harvest status', 'active crops'],
    category: 'Listing Management',
    title: 'Managing Your Harvest Inventory',
    content: {
      en: `In the "My Harvest" module, you can manage all your farm listings:
• View Active, Draft, and Completed crop batches.
• Edit expected prices, quantities, and readiness dates at any time.
• Publish saved drafts with one tap.
• Review the chronological audit timeline for each harvest listing.`,
      ta: `உங்கள் அறுவடைப் பட்டியல்களை நிர்வகிக்க:
• "My Harvest" பகுதிக்குச் செல்லவும்.
• செயலில் உள்ள மற்றும் வரைவுப் பட்டியல்களைப் பார்க்கவும்.
• விலை மற்றும் அளவுகளை எப்போது வேண்டுமானாலும் திருத்தவும்.`,
      hi: `अपनी फसलों का प्रबंधन करने के लिए:
• "My Harvest" टैब पर जाएं।
• सक्रिय, ड्राफ्ट और पूर्ण हुई फसलों की सूची देखें।
• किसी भी समय मूल्य या मात्रा को अपडेट करें।`,
    },
    actions: [
      { label: 'Open My Harvest', actionType: 'navigate', targetTab: 'harvest' },
      { label: '+ Add New Harvest', actionType: 'open_add_harvest' },
    ],
  },

  // 5. Orders & Delivery Tracking
  {
    id: 'orders-delivery',
    keywords: ['track order', 'delivery status', 'pickup truck', 'logistics', 'in transit', 'ready for pickup', 'driver phone', 'vehicle number'],
    category: 'Logistics & Orders',
    title: 'Order Status & Farmgate Pickup Tracking',
    content: {
      en: `Track your farmgate dispatches in "Orders & Delivery":
• Live step progression: Order Confirmed → Ready for Pickup → In Transit → Delivered → Completed.
• When ready, tap "Mark Ready for Pickup" so the assigned carrier is notified.
• View the assigned driver name, verified phone number, and vehicle registration number.
• Digital delivery receipts are confirmed upon arrival.`,
      ta: `ஆர்டர் மற்றும் சரக்கு போக்குவரத்தைக் கண்காணிக்க:
• "Orders & Delivery" பகுதிக்குச் செல்லவும்.
• அறுவடை தயாரானதும் "Mark Ready for Pickup" என்பதை அழுத்தவும்.
• வாகன எண் மற்றும் ஓட்டுநர் விவரங்களைப் பார்க்கவும்.`,
      hi: `ऑर्डर और डिलीवरी ट्रैक करने के लिए:
• "Orders & Delivery" टैब खोलें।
• फसल तैयार होने पर "Mark Ready for Pickup" पर क्लिक करें।
• ड्राइवर का नाम, मोबाइल नंबर और वाहन संख्या देखें।`,
    },
    actions: [
      { label: 'Track Active Orders', actionType: 'navigate', targetTab: 'deliveries' },
    ],
  },

  // 6. Payments & Escrow Protection
  {
    id: 'payments-escrow',
    keywords: ['payment', 'escrow', 'money', 'bank transfer', 'payout', 'settlement', 'transaction', 'upi', 'direct deposit', 'payment status'],
    category: 'Financial Security',
    title: 'Escrow Settlements & Payout Security',
    content: {
      en: `FarmLink uses guaranteed tripartite escrow accounts for safe payments:
• Buyer funds are verified and locked into escrow before transport pickup.
• When delivery is confirmed, funds are released directly to your linked bank account.
• View transparent gross receipts, APMC fee breakdowns, and exact net payouts in the "Payments" tab.
• No arbitrary payment cuts, broker delays, or unverified cheques.`,
      ta: `பாதுகாப்பான பணப் பரிவர்த்தனை:
• வாங்குபவர் பணம் முன்கூட்டியே எஸ்க்ரோ (Escrow) கணக்கில் பாதுகாப்பாக வைக்கப்படுகிறது.
• டெலிவரி முடிந்ததும் பணம் நேரடியாக உங்கள் வங்கிக் கணக்கிற்கு மாற்றப்படும்.
• "Payments" பகுதியில் முழு விவரங்களையும் பார்க்கலாம்.`,
      hi: `सुरक्षित भुगतान प्रणाली:
• खरीदार की राशि पिकअप से पहले एस्क्रो खाते में सुरक्षित जमा होती है।
• डिलीवरी की पुष्टि होने पर राशि सीधे आपके बैंक खाते में भेजी जाती है।
• "Payments" टैब में सभी लेनदेन का पूरा विवरण देखें।`,
    },
    actions: [
      { label: 'View Payment History', actionType: 'navigate', targetTab: 'payments' },
    ],
  },

  // Buyer: Finding & Browsing Harvests
  {
    id: 'find-harvest',
    keywords: ['find harvest', 'find a harvest', 'browse harvest', 'search harvest', 'buy crop', 'procure crop', 'available crops', 'browse harvests'],
    category: 'Harvest Procurement',
    title: 'Discovering & Searching Available Harvests',
    content: {
      en: `To find and procure fresh farm produce on FarmLink:
• Go to the "Browse Harvests" section to explore verified farmer listings across Tamil Nadu & Karnataka.
• Use the search bar to filter by crop name, farm region, quality grade (Grade A/B), or farming practice (Organic / Conventional).
• Review clear expected lot prices, available quantities, and dispatch readiness dates.
• Click "View Details" on any lot to review the complete grower profile and quality specifications.`,
      ta: `அறுவடைகளைக் கண்டறிந்து கொள்முதல் செய்ய:
• "Browse Harvests" பகுதிக்குச் செல்லவும்.
• பயிர் பெயர், மாவட்டம், தரம் (Grade A/B) ஆகியவற்றின் அடிப்படையில் தேடலாம்.
• விலை, அளவு மற்றும் அறுவடைத் தேதியைச் சரிபார்த்து "View Details" என்பதை அழுத்தவும்.`,
      hi: `फसलें खोजने और खरीदने के लिए:
• "Browse Harvests" टैब पर जाएं।
• फसल के नाम, जिले, ग्रेड और जैविक/पारंपरिक खेती के अनुसार फ़िल्टर करें।
• पूरी जानकारी देखने के लिए "View Details" पर क्लिक करें।`,
    },
    actions: [
      { label: 'Browse Harvests', actionType: 'navigate', targetTab: 'harvest' },
    ],
  },

  // Buyer: Saving Harvests
  {
    id: 'save-harvest',
    keywords: ['save harvest', 'save a harvest', 'bookmark harvest', 'saved crops', 'saved harvests', 'how do i save'],
    category: 'Saved Harvests',
    title: 'Saving & Bookmarking Harvest Lots',
    content: {
      en: `To save a harvest lot for later review:
• Tap the "Save" (Bookmark) icon on any harvest listing card or inside the lot details view.
• Open the "Saved Harvests" tab from your navigation menu at any time to compare your bookmarked lots.
• You can remove saved lots with one click or proceed directly to submit an interest request.`,
      ta: `அறுவடைகளைச் சேமித்து வைக்க:
• அறுவடை அட்டை அல்லது விவரப் பக்கத்தில் உள்ள "Save" பொத்தானைத் தட்டவும்.
• நீங்கள் சேமித்த அனைத்து பயிர்களையும் "Saved Harvests" பகுதியில் பார்க்கலாம்.`,
      hi: `फसलों को सेव करने के लिए:
• किसी भी फसल कार्ड पर "Save" बटन पर क्लिक करें।
• बाद में "Saved Harvests" टैब में जाकर अपनी पसंदीदा फसलें देखें।`,
    },
    actions: [
      { label: 'View Saved Harvests', actionType: 'navigate', targetTab: 'harvest' },
    ],
  },

  // Buyer: Submitting Interest Requests
  {
    id: 'submit-interest',
    keywords: ['submit interest', 'submit an interest request', 'express interest', 'buy harvest', 'purchase request', 'order harvest', 'interest request'],
    category: 'Purchase Requests',
    title: 'Submitting Purchase Interest Requests',
    content: {
      en: `To express buying interest for a harvest:
• Tap "Express Interest" on the desired harvest card.
• Enter your required quantity (in kg or quintals) and intended business use (Wholesale, Retail, Food Processing).
• Select your preferred collection method (Farmgate Pickup, Mandi Delivery, or Buyer Transport) and target fulfillment date.
• Once submitted, track your request under "My Requests" as it moves from Submitted → Under Review → Accepted.`,
      ta: `கொள்முதல் விருப்பத்தை (Interest Request) சமர்ப்பிக்க:
• நீங்கள் விரும்பும் பயிர் அட்டையில் "Express Interest" என்பதை அழுத்தவும்.
• தேவையான அளவு, பயன்பாட்டு நோக்கம் மற்றும் பிக்கப் முறையைத் தேர்ந்தெடுக்கவும்.
• சமர்ப்பித்த பின் "My Requests" பகுதியில் நிலவரத்தைக் கண்காணிக்கலாம்.`,
      hi: `खरीद अनुरोध (Interest Request) भेजने के लिए:
• फसल कार्ड पर "Express Interest" पर क्लिक करें।
• आवश्यक मात्रा, उपयोग का प्रकार और पिकअप की तारीख चुनें।
• "My Requests" टैब में अपने अनुरोध की स्थिति देखें।`,
    },
    actions: [
      { label: 'Browse Harvests', actionType: 'navigate', targetTab: 'harvest' },
    ],
  },

  // 7. Profile & Settings
  {
    id: 'profile-settings',
    keywords: ['profile', 'settings', 'farm details', 'change language', 'accessibility', 'larger text', 'high contrast', 'update name', 'village'],
    category: 'Account & Settings',
    title: 'Profile & Farm Settings',
    content: {
      en: `In "Profile & Settings", you can configure your personalized experience:
• Personal Info: Update your name, village, district, and contact preferences.
• Farm Details: Record total acreage, irrigation type, and primary crops.
• Language: Select English, தமிழ், हिन्दी, తెలుగు, മലയാളം, or ಕನ್ನಡ.
• Accessibility: Toggle Larger Text, High-Contrast mode, or Reduced Motion.
• Verification: Review your trust status and support helpline contacts.`,
      ta: `சுயவிவரம் மற்றும் அமைப்புகள்:
• "Profile & Settings" பகுதிக்குச் செல்லவும்.
• உங்கள் பெயர், பண்ணை நில அளவு, பாசன முறை போன்றவற்றை மாற்றலாம்.
• தமிழ், ஆங்கிலம் உள்ளிட்ட மொழிகளைத் தேர்ந்தெடுக்கலாம்.`,
      hi: `प्रोफ़ाइल और सेटिंग्स:
• "Profile & Settings" टैब पर जाएं।
• अपना नाम, गांव, भूमि क्षेत्र और सिंचाई का प्रकार अपडेट करें।
• भाषा और एक्सेसिबिलिटी विकल्प बदलें।`,
    },
    actions: [
      { label: 'Open Profile & Settings', actionType: 'navigate', targetTab: 'profile' },
    ],
  },

  // 8. Tomato Cultivation & Harvesting
  {
    id: 'tomato-care',
    keywords: ['tomato', 'harvest tomato', 'growing tomato', 'tomato disease', 'tomato yield', 'ripeness', 'crates tomato'],
    category: 'Crop Guidance',
    title: 'Tomato Harvesting & Quality Guidelines',
    content: {
      en: `Best practices for harvesting quality Tomatoes:
• Harvest Timing: For long-distance transport (e.g. Bangalore/Chennai), harvest at the "Breaker" or "Turning" stage (pinkish blush). For local sales, pick firm light-red fruits.
• Avoid harvesting during wet morning dew or extreme midday heat to prevent fungal skin cracks.
• Sorting & Grading: Grade fruits by size and firmness into ventilated plastic crates. Avoid stacking more than 3-4 layers per crate to prevent bruising.
• Clean sorting increases buyer acceptance and fetches higher modal prices.`,
      ta: `தக்காளி அறுவடை குறிப்புகள்:
• தூரத்து சந்தைகளுக்கு அனுப்பும்போது காய் நிறம் மாறும் (Breaker) நிலையில் அறுவடை செய்யவும்.
• அதிக ஈரப்பதம் உள்ள காலை நேரத்திலோ அல்லது உச்சி வெயிலிலோ பறிப்பதைத் தவிர்க்கவும்.
• பிளாஸ்டிக் பெட்டிகளில் (crates) காற்றோட்டமாக அடுக்கி வைக்கவும்.`,
      hi: `टमाटर की सही तुड़ाई के उपाय:
• दूर की मंडियों के लिए फल के थोड़ा लाल होने (ब्रेकर स्टेज) पर तुड़ाई करें।
• ओस या दोपहर की तेज धूप में तुड़ाई न करें।
• फलों को आकार और मजबूती के अनुसार प्लास्टिक क्रेट में व्यवस्थित रखें।`,
    },
    actions: [
      { label: 'Check Tomato Mandi Rates', actionType: 'navigate', targetTab: 'market' },
      { label: '+ Add Tomato Harvest', actionType: 'open_add_harvest' },
    ],
  },

  // 9. Onion Cultivation & Storage
  {
    id: 'onion-care',
    keywords: ['onion', 'harvest onion', 'onion storage', 'curing onion', 'dry onion', 'onion price', 'red onion'],
    category: 'Crop Guidance',
    title: 'Onion Curing & Storage Guidelines',
    content: {
      en: `Best practices for Onion harvest and curing:
• Harvest Readiness: Harvest when 50% of the crop foliage falls over naturally (neck fall stage).
• Field Curing: Allow bulbs to dry on field ridges for 3-5 days under shade cover, followed by 10-15 days of shed curing to develop dry papery skins.
• Storage: Store in well-ventilated slatted wooden or bamboo structures. Keep relative humidity low to prevent sprouting and fungal rot.
• Well-cured onions withstand transit and command premium rates from bulk exporters.`,
      ta: `வெங்காயம் அறுவடை மற்றும் சேமிப்பு:
• 50% தாள்கள் கீழே சாய்ந்தவுடன் அறுவடை செய்யவும்.
• 10-15 நாட்கள் நிழலில் உலர்த்தி (curing) தோலை உறுதியாக்க வேண்டும்.
• நல்ல காற்றோட்டமுள்ள அறைகளில் சேமிக்கவும்.`,
      hi: `प्याज की तुड़ाई और भंडारण:
• पौधों की पत्तियां 50% झुकने पर ही खुदाई करें।
• 10-15 दिन छायादार जगह पर सुखाएं (क्योरिंग) ताकि छिलका मजबूत बने।
• हवादार भंडारण संरचनाओं में रखें।`,
    },
    actions: [
      { label: 'Check Onion Mandi Rates', actionType: 'navigate', targetTab: 'market' },
      { label: '+ Add Onion Harvest', actionType: 'open_add_harvest' },
    ],
  },

  // 10. Potato Cultivation & Sorting
  {
    id: 'potato-care',
    keywords: ['potato', 'harvest potato', 'potato storage', 'curing potato', 'potato grading', 'table potato'],
    category: 'Crop Guidance',
    title: 'Potato Harvesting & Handling Guidelines',
    content: {
      en: `Best practices for Potato harvesting:
• Dehaulming: Cut foliage (haulms) 10-12 days before harvest to thicken and toughen tuber skin.
• Harvesting: Harvest on clear sunny days when soil is friable. Avoid skinning tubers during digging.
• Curing: Cure tubers in a dark, cool, well-ventilated shed for 10 days to heal skin wounds.
• Never expose potatoes to direct sunlight in the field, as it causes greening (solanine toxicity).`,
      ta: `உருளைக்கிழங்கு அறுவடை குறிப்புகள்:
• அறுவடைக்கு 10 நாட்களுக்கு முன்பு செடிகளின் தழைகளை வெட்டிவிடவும்.
• வெயிலில் உருளைக்கிழங்கை நேரடியாகப் போடக்கூடாது (பச்சை நிறமாக மாறும்).
• குளிர்ந்த, காற்றோட்டமான இடத்தில் 10 நாட்கள் உலர்த்தி சேமிக்கவும்.`,
      hi: `आलू की तुड़ाई के महत्वपूर्ण नियम:
• खुदाई से 10 दिन पहले पौधों की शाखाएं काट दें ताकि छिलका मजबूत हो जाए।
• आलुओं को सीधे धूप में न छोड़ें, इससे वे हरे हो सकते हैं।
• 10 दिन तक ठंडी और हवादार जगह पर सुखाकर छांटें।`,
    },
    actions: [
      { label: 'Check Potato Mandi Rates', actionType: 'navigate', targetTab: 'market' },
      { label: '+ Add Potato Harvest', actionType: 'open_add_harvest' },
    ],
  },

  // 11. General Crop Care
  {
    id: 'general-crop-care',
    keywords: ['crop care', 'irrigation', 'fertilizer', 'soil', 'pesticide', 'farming tips', 'organic', 'crop health'],
    category: 'Agronomy Advice',
    title: 'General Crop Health & Irrigation Guidance',
    content: {
      en: `Essential farm management recommendations:
• Drip Irrigation: Schedule irrigation early morning to minimize evaporation and leaf fungal infections.
• Soil Moisture: Maintain field capacity without waterlogging root zones.
• Nutrition: Combine organic farmyard manure with balanced soil testing for optimal yield.
• Quality Harvest: Harvest clean, sort properly, and package in standardized crates for maximum buyer trust.

Disclaimer: For severe pest infestations or chemical dosages, consult your local Krishi Vigyan Kendra (KVK) or agricultural officer.`,
      ta: `பொதுவான பயிர் மேலாண்மை:
• சொட்டு நீர்ப்பாசனத்தை அதிகாலை நேரத்தில் இயக்கவும்.
• வேர் பகுதிகளில் தண்ணீர் தேங்காமல் பார்த்துக் கொள்ளவும்.
• இயற்கை உரங்களைப் பயன்படுத்தி மண்ணின் வளத்தைப் பாதுகாக்கவும்.`,
      hi: `फसल देखभाल की सामान्य सलाह:
• सुबह के समय टपक सिंचाई (ड्रिप) करें ताकि पत्तों पर फफूंद न लगे।
• मिट्टी की नमी बनाए रखें लेकिन जलभराव न होने दें।
• संतुलित पोषक तत्वों का प्रयोग करें।`,
    },
    actions: [
      { label: 'Check Market Prices', actionType: 'navigate', targetTab: 'market' },
    ],
  },
  {
    id: 'update-delivery-status',
    keywords: ['update delivery', 'update status', 'delivery status', 'transit stage', 'pickup pending', 'picked up', 'in transit', 'logistics status'],
    category: 'Logistics',
    title: 'Updating Farm Delivery Status',
    content: {
      en: `To update delivery status in FarmLink Logistics:
1. Open the "Deliveries" tab or tap "Update Status" on any assigned trip in your Dashboard.
2. Select the consignment stage:
   • 1. Assigned (Manifest created)
   • 2. Pickup Pending (En route to farmgate / FPO collection yard)
   • 3. Picked Up (Produce loaded & sealed)
   • 4. In Transit (Highway dispatch)
   • 5. Delivered (Handover at destination)
3. Choose a quick preset note or enter custom dispatch remarks (e.g. temperature verification).
4. Tap "Confirm Status Update". The timeline updates immediately.`,
      ta: `டெலிவரி நிலையை மாற்றுவது எப்படி:
1. "Deliveries" பகுதிக்குச் செல்லவும்.
2. பொருத்தமான நிலையைத் தேர்ந்தெடுக்கவும் (Assigned, Pickup Pending, Picked Up, In Transit, Delivered).
3. ஓட்டுநர் குறிப்பைச் சேர்த்து "Confirm Status Update" என்பதை அழுத்தவும்.`,
      hi: `डिलीवरी स्थिति अपडेट करने का तरीका:
1. "Deliveries" सेक्शन में जाएं या डैशबोर्ड पर "Update Status" दबाएं।
2. सही स्थिति चुनें (Assigned, Pickup Pending, Picked Up, In Transit, Delivered)।
3. ड्राइवर नोट जोड़कर "Confirm Status Update" पर टैप करें।`,
    },
    actions: [
      { label: 'View Deliveries', actionType: 'navigate', targetTab: 'deliveries' },
    ],
  },
  {
    id: 'proof-of-delivery',
    keywords: ['proof of delivery', 'pod', 'mark delivered', 'delivery code', 'complete delivery', 'buyer handover', 'confirm pod'],
    category: 'Logistics',
    title: 'Completing Digital Proof of Delivery (POD)',
    content: {
      en: `How to complete Proof of Delivery (POD):
1. Upon arriving at the buyer warehouse or Mandi dock, inspect produce crates and weighment.
2. Tap "Confirm POD" on the delivery card.
3. Select your verification method:
   • Delivery Code (Enter 4-digit code provided by buyer)
   • Buyer Signoff (Receiving supervisor verification)
   • Manual Check
4. Enter receiver's name and condition remarks.
5. Tap "Mark Delivery Completed". This closes the trip and logs the electronic POD record in Delivery History.`,
      ta: `டெலிவரி உறுதிப்படுத்தல் (POD) பதிவு செய்வது எப்படி:
1. வாங்குபவர் கிடங்கில் காய்கறி கூடைகளைச் சரிபார்க்கவும்.
2. "Confirm POD" என்பதை அழுத்தவும்.
3. வாங்குபவர் குறியீடு அல்லது கையொப்பத்தைத் தேர்ந்தெடுத்து உறுதிப்படுத்தவும்.`,
      hi: `प्रूफ ऑफ डिलीवरी (POD) पूरा करने का तरीका:
1. खरीदार के वेयरहाउस पर माल की जांच करें।
2. "Confirm POD" बटन दबाएं।
3. डिलीवरी कोड या खरीदार पुष्टि चुनकर सबमिट करें।`,
    },
    actions: [
      { label: 'Delivery History', actionType: 'navigate', targetTab: 'history' },
    ],
  },
  {
    id: 'route-distance',
    keywords: ['route distance', 'travel time', 'corridor', 'highway route', 'waypoints', 'route summary', 'km distance'],
    category: 'Logistics',
    title: 'Route Profiles & Travel Duration Estimates',
    content: {
      en: `Understanding Route Summaries in FarmLink:
• Highway Corridors: FarmLink maps standard agricultural routes (e.g. NH-48 Chennai-Bengaluru, NH-45 Chennai-Trichy, NH-44 Hosur).
• Distance & Time: Distance in km and estimated travel time are illustrative demo values designed for route planning.
• Waypoints: Each route lists origin collection yards, intermediate quality toll nodes, and destination receiving docks.
• Note: FarmLink uses demo profile data and does not request location permissions or connect to live GPS.`,
      ta: `பாதை மற்றும் தூர விவரங்கள்:
• தேசிய நெடுஞ்சாலை வழிகள் (NH-48, NH-45, NH-44) அடிப்படையில் பயண நேரம் கணக்கிடப்படுகிறது.
• அனைத்து தூரங்களும் விளக்கக் காட்சிக்கான டெமோ விவரங்கள் ஆகும்.`,
      hi: `मार्ग और दूरी की जानकारी:
• प्रमुख कृषि राजमार्गों के आधार पर दूरी और समय का अनुमान लगाया जाता है।
• यह केवल प्रदर्शन (डेमो) डेटा है, लाइव जीपीएस नहीं।`,
    },
    actions: [
      { label: 'Route Summary', actionType: 'navigate', targetTab: 'route' },
    ],
  },
  {
    id: 'help-center',
    keywords: ['help', 'help centre', 'support', 'faq', 'contact support', 'customer care', 'raise ticket', 'assistance', 'guide'],
    category: 'Support',
    title: 'FarmLink Help Centre & Support Desk',
    content: {
      en: `Welcome to the FarmLink Help Centre!
• Search FAQs: Browse verified guides on harvest listings, mandi market prices, buyer requests, delivery tracking, and escrow payments.
• Contact Support: Submit a demo support request for account, listing, delivery, or payment inquiries.
• Support History: Review status updates on all submitted tickets.
• Safety & Guidelines: Learn about APMC fund protection and standardized quality grading.`,
      ta: `ஃபார்ம்லிங்க் உதவி மையம்:
• அடிக்கடி கேட்கப்படும் கேள்விகளைத் தேடலாம்.
• கணக்கு, விற்பனை அல்லது டெலிவரி தொடர்பான உதவிக்கு ஆதரவுக் கோரிக்கையை அனுப்பலாம்.`,
      hi: `फार्मलिंक सहायता केंद्र:
• अक्सर पूछे जाने वाले प्रश्न (FAQ) खोजें।
• अपनी समस्या के लिए सपोर्ट टिकट दर्ज करें।`,
    },
    actions: [
      { label: 'Open Help Centre', actionType: 'open_help_center' },
    ],
  },
];

/**
 * Intelligent Keyword & Intent Matching Engine
 */
export const findChatResponse = (
  userText: string,
  langCode: 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn' = 'en'
): { text: string; actions?: ChatAction[]; topicTitle?: string } => {
  const normalized = userText.trim().toLowerCase();

  if (!normalized) {
    return {
      text: "Please type a question or choose from the suggested farming topics below.",
    };
  }

  // 1. Check for greetings
  const greetingKeywords = ['hi', 'hello', 'vanakkam', 'namaste', 'hey', 'good morning', 'good afternoon', 'good evening', 'வணக்கம்', 'नमस्ते', 'హలో', 'ഹലോ', 'ಹಲೋ'];
  if (greetingKeywords.some((g) => normalized === g || normalized.startsWith(`${g} `))) {
    const langObj = CHATBOT_LANGUAGES.find((l) => l.code === langCode) || CHATBOT_LANGUAGES[0];
    return {
      text: langObj.greeting,
      actions: [
        { label: '+ Add Harvest', actionType: 'open_add_harvest' },
        { label: 'View Market Prices', actionType: 'navigate', targetTab: 'market' },
        { label: 'Find Buyers', actionType: 'navigate', targetTab: 'buyers' },
      ],
    };
  }

  // 2. Exact keyword and substring scoring
  let bestMatch: ChatbotTopicResponse | null = null;
  let highestScore = 0;

  for (const topic of PREDEFINED_TOPICS) {
    let score = 0;

    for (const keyword of topic.keywords) {
      if (normalized === keyword) {
        score += 10;
      } else if (normalized.includes(keyword)) {
        score += 5;
      } else {
        // Word intersection
        const keywordWords = keyword.split(' ');
        const matches = keywordWords.filter((kw) => normalized.includes(kw));
        if (matches.length === keywordWords.length && keywordWords.length > 1) {
          score += 4;
        } else if (matches.length > 0) {
          score += 1;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  if (bestMatch && highestScore >= 2) {
    const contentByLang = bestMatch.content[langCode] || bestMatch.content.en;
    return {
      text: contentByLang,
      actions: bestMatch.actions,
      topicTitle: bestMatch.title,
    };
  }

  // 3. Fallback response
  const fallbackText = langCode === 'ta'
    ? "மன்னிக்கவும், இந்த தலைப்பு பற்றி நான் இன்னும் கற்றுக்கொண்டு வருகிறேன். அறுவடை சேர்த்தல், மண்டி விலைகள், வாங்குபவர்கள், ஆர்டர்கள், பணம் செலுத்துதல் அல்லது பயிர் பராமரிப்பு பற்றி என்னிடம் கேட்கலாம்."
    : langCode === 'hi'
    ? "मुझे इस विषय की सीमित जानकारी है। आप मुझसे फसल जोड़ने, मंडी भाव, खरीदारों, ऑर्डर, भुगतान या बुनियादी फसल देखभाल के बारे में पूछ सकते हैं।"
    : "I’m still learning about that topic. You can ask me about adding harvests, market prices, buyers, orders, payments, or basic crop care.";

  return {
    text: fallbackText,
    actions: [
      { label: '+ Add Harvest', actionType: 'open_add_harvest' },
      { label: 'Market Prices', actionType: 'navigate', targetTab: 'market' },
      { label: 'Find Buyers', actionType: 'navigate', targetTab: 'buyers' },
      { label: 'Track Orders', actionType: 'navigate', targetTab: 'deliveries' },
      { label: 'Payment Help', actionType: 'navigate', targetTab: 'payments' },
    ],
  };
};
