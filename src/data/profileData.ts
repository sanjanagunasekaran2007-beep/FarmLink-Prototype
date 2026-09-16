import { 
  FarmerProfileData, 
  FarmDetailsData, 
  AccessibilitySettings, 
  NotificationSettings, 
  VerificationItemStatus, 
  FAQItem 
} from '@/types';

export const INITIAL_FARMER_PROFILE: FarmerProfileData = {
  fullName: 'Santhosh Kumar',
  mobile: '+91 98421 78901',
  email: 'santhosh.farm@farmlink.in',
  village: 'Poondi',
  district: 'Tiruvallur',
  state: 'Tamil Nadu',
  preferredLanguage: 'English',
  verificationStatus: 'Profile partially verified',
};

export const INITIAL_FARM_DETAILS: FarmDetailsData = {
  farmName: 'Green Valley Farms (Plot 4B)',
  totalArea: '5.5',
  areaUnit: 'Acres',
  mainCrops: ['Tomato', 'Onion', 'Green Chili', 'Potato'],
  farmingMethod: 'Organic',
  irrigationType: 'Drip irrigation',
};

export const INITIAL_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  largerText: false,
  highContrast: false,
  reducedMotion: false,
  simpleInterface: false,
};

export const INITIAL_NOTIFICATION_SETTINGS: NotificationSettings = {
  orderUpdates: true,
  deliveryUpdates: true,
  buyerInterest: true,
  marketPrices: true,
  generalAnnouncements: false,
};

export const INITIAL_VERIFICATION_STATUSES: VerificationItemStatus[] = [
  {
    title: 'Profile Information',
    status: 'Completed',
    description: 'Name, village, and district registered for marketplace trust.',
    note: 'Basic details complete',
  },
  {
    title: 'Mobile Verification',
    status: 'Completed',
    description: 'Mobile number verified via secure SMS one-time passcode.',
    note: 'OTP verified',
  },
  {
    title: 'Farm Information',
    status: 'Completed',
    description: 'Land area, main crops, and irrigation setup recorded.',
    note: 'Plot 4B (5.5 Acres)',
  },
  {
    title: 'Overall Profile Status',
    status: 'Pending',
    description: 'Profile partially verified. Secure government registry integration will activate upon availability.',
    note: 'Partially verified for trading',
  },
];

export const SUPPORT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Harvest Listing',
    question: 'How to add a harvest?',
    answer: 'Tap the "+ Add Harvest" button on your dashboard or navigation bar. Enter the crop name, harvested quantity, expected price per unit, and pickup location. You can choose to publish immediately or save it as a draft for later review.',
  },
  {
    id: 'faq-2',
    category: 'Buyer Discovery',
    question: 'How to find buyers?',
    answer: 'Navigate to the "Find Buyers" tab to browse verified wholesale traders, retail aggregators, and food processors. Filter by required crop, state, or quantity requirement, and tap "Express Interest" to connect directly.',
  },
  {
    id: 'faq-3',
    category: 'Orders & Tracking',
    question: 'How to track an order?',
    answer: 'Open "Orders & Delivery" from the navigation menu to view active consignments. You can monitor the live status timeline from Order Confirmed, Ready for Pickup, In Transit, through to Final Delivery.',
  },
  {
    id: 'faq-4',
    category: 'Payments',
    question: 'How to view payments?',
    answer: 'Open the "Payments" tab to view all completed and pending settlements. Each payout displays a complete escrow settlement breakdown including gross amount, Mandi fee, and net direct deposit to your bank account.',
  },
  {
    id: 'faq-5',
    category: 'Escrow Security',
    question: 'How is escrow payment protected?',
    answer: 'When a buyer places an order, the purchase amount is deposited into an independent tripartite escrow holding account before pickup. Once you confirm pickup and delivery is acknowledged, funds are released directly to your account.',
  },
  {
    id: 'faq-6',
    category: 'Logistics',
    question: 'How does farmgate pickup work?',
    answer: 'When an order is confirmed, FarmLink logistics assigns a verified carrier. The driver will contact you prior to arrival at your designated farmgate or village pickup location. Keep your harvested crates or bags ready.',
  },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', region: 'Default' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'தமிழ்நாடு' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'भारत' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'ఆంధ్రప్రదేశ్ / తెలంగాణ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', region: 'കേരളം' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'ಕರ್ನಾಟಕ' },
];
