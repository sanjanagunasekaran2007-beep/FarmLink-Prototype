export type RoleType = 'farmer' | 'buyer' | 'logistics' | 'admin';

export type AppView = 
  | 'splash'
  | 'role_selection'
  | 'role_transition'
  | 'role_login'
  | 'farmer_dashboard'
  | 'buyer_dashboard'
  | 'logistics_dashboard'
  | 'admin_dashboard';

export type FarmerTab = 'home' | 'market' | 'buyers' | 'harvest' | 'deliveries' | 'payments' | 'profile';

export type BuyerTab = 'dashboard' | 'browse' | 'saved' | 'requests' | 'orders' | 'payments' | 'profile';

export type BuyerType = 
  | 'Wholesale Buyer' 
  | 'Retailer' 
  | 'Food Processing Company' 
  | 'Exporter' 
  | 'Restaurant' 
  | 'FPO';

export type PickupDeliveryPref = 
  | 'Farmgate Pickup' 
  | 'Mandi Delivery' 
  | 'Buyer Arranged Transport' 
  | 'Flexible';


export interface BuyerProfile {
  id: string;
  name: string;
  buyerType: BuyerType;
  location: string;
  state: string;
  district: string;
  distanceKm?: number;
  isVerified: boolean;
  cropsRequired: string[];
  quantityRequirement: string;
  quantityCategory: 'Small' | 'Medium' | 'Large';
  pickupPreference: PickupDeliveryPref;
  description: string;
  about: string;
  operatingAreas: string[];
  contactStatus: string;
  tradeCount: number;
  escrowRating: string;
  badges: string[];
}

export interface InterestRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: BuyerType;
  buyerLocation: string;
  cropName: string;
  quantity: number;
  unit: string;
  harvestId?: string;
  preferredPickupDate: string;
  pickupPreference: PickupDeliveryPref;
  message?: string;
  status: 'Sent' | 'Viewed' | 'Accepted' | 'Closed';
  submittedAt: string;
  timestamp: string;
}

export interface RoleTheme {
  primary: string;
  primaryHover: string;
  secondary: string;
  surface: string;
  border: string;
  badgeText: string;
  iconBg: string;
}

export interface RoleOption {
  id: RoleType;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  theme: RoleTheme;
}

export type QualityGrade = 'Grade A' | 'Grade B' | 'Grade C' | 'Not specified';
export type FarmingMethod = 'Conventional' | 'Organic' | 'Natural farming' | 'Not specified';
export type PriceType = 'Fixed expected price' | 'Open to buyer offers';
export type HarvestUnit = 'Kilograms' | 'Quintals' | 'Tonnes' | 'Crates' | 'Bags';
export type CropCategory = 'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Spices' | 'Other';

export type HarvestStatus = 
  | 'Published'
  | 'Draft'
  | 'Completed'
  | 'Archived'
  | 'Active'
  | 'Under Verification'
  | 'Booked'
  | 'Sold';

export interface HarvestTimelineEvent {
  title: string;
  timestamp: string;
  description: string;
  statusBadge?: string;
}

export interface HarvestItem {
  id: string;
  harvestCode?: string;
  cropName: string;
  category: CropCategory | string;
  variety?: string;
  grade?: QualityGrade;
  quantity: number;
  unit: HarvestUnit | string;
  expectedPrice: number;
  priceType?: PriceType;
  harvestDate: string;
  availableFrom?: string;
  state?: string;
  district?: string;
  village?: string;
  pickupLocation: string;
  imageUrl?: string;
  description?: string;
  farmingMethod?: FarmingMethod;
  status: HarvestStatus;
  createdAt: string;
  updatedAt?: string;
  isDraft?: boolean;
  timeline?: HarvestTimelineEvent[];
}

export interface HarvestFormData {
  cropName: string;
  category: CropCategory;
  variety: string;
  grade: QualityGrade;
  quantity: string;
  unit: HarvestUnit;
  expectedPrice: string;
  priceType: PriceType;
  harvestDate: string;
  availableFrom: string;
  state: string;
  district: string;
  village: string;
  pickupLocation: string;
  imageUrl: string | null;
  description: string;
  farmingMethod: FarmingMethod;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  dayLabel: string;
  volumeTons?: number;
}

export interface NearbyMarketComparison {
  marketName: string;
  location: string;
  price: number;
  unit: string;
  distanceKm: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  isHigher?: boolean;
}

export interface MarketPriceItem {
  id: string;
  cropName: string;
  category: CropCategory | string;
  variety?: string;
  price: number;
  unit: string;
  marketLocation: string;
  state?: string;
  district?: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  arrivalTons?: number;
  minPrice?: number;
  maxPrice?: number;
  modalPrice?: number;
  lastUpdated: string;
  movementExplanation: string;
  history7Days: PriceHistoryPoint[];
  nearbyMarkets: NearbyMarketComparison[];
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'listing' | 'buyer' | 'delivery' | 'payment';
  statusBadge: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'price' | 'order' | 'delivery' | 'system';
}

export type OrderStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Ready for Pickup' 
  | 'In Transit' 
  | 'Delivered' 
  | 'Completed';

export interface TrackingStep {
  stage: string;
  stageKey: 'confirmed' | 'prepared' | 'ready_for_pickup' | 'picked_up' | 'in_transit' | 'delivered' | 'completed';
  date?: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface LogisticsProvider {
  name: string;
  vehicleNo: string;
  vehicleType: string;
  driverName: string;
  driverPhone: string;
  contactStatus: string;
  rating: number;
}

export interface OrderDeliveryItem {
  id: string;
  orderCode: string;
  harvestRef?: string;
  cropName: string;
  category?: string;
  variety?: string;
  quantity: number;
  unit: string;
  totalAmount?: number;
  escrowStatus?: string;
  buyerName: string;
  buyerType?: string;
  buyerLocation: string;
  buyerContact?: string;
  pickupLocation: string;
  deliveryLocation: string;
  orderDate: string;
  expectedDate: string;
  status: OrderStatus;
  logisticsProvider?: LogisticsProvider;
  deliveryInstructions?: string;
  timeline: {
    title: string;
    timestamp: string;
    description: string;
    statusBadge?: string;
  }[];
  trackingSteps: TrackingStep[];
  isDemoData?: boolean;
}

export type PaymentStatus = 'Completed' | 'Pending' | 'Processing' | 'Failed';

export interface PaymentTimelineStep {
  stage: string;
  stageKey: 'order_completed' | 'payment_initiated' | 'payment_processing' | 'payment_completed';
  timestamp?: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface TransactionItem {
  id: string;
  transactionCode: string;
  orderId: string;
  harvestId?: string;
  buyerName: string;
  buyerType?: string;
  cropName: string;
  variety?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  grossAmount: number;
  platformFee?: number;
  taxOrCess?: number;
  netAmount: number;
  date: string;
  timestamp: string;
  paymentMethod: string;
  status: PaymentStatus;
  notes?: string;
  timeline: PaymentTimelineStep[];
  isDemoData: boolean;
}

export interface FarmerProfileData {
  fullName: string;
  mobile: string;
  email: string;
  village: string;
  district: string;
  state: string;
  preferredLanguage: string;
  verificationStatus: string;
}

export type FarmlandAreaUnit = 'Acres' | 'Hectares';
export type FarmFarmingMethod = 'Conventional' | 'Organic' | 'Mixed';
export type FarmIrrigationType = 'Rain-fed' | 'Borewell' | 'Canal' | 'Drip irrigation' | 'Other';

export interface FarmDetailsData {
  farmName: string;
  totalArea: string;
  areaUnit: FarmlandAreaUnit;
  mainCrops: string[];
  farmingMethod: FarmFarmingMethod;
  irrigationType: FarmIrrigationType;
}

export type SupportedLanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn';

export interface LanguageItem {
  code: SupportedLanguageCode;
  name: string;
  native: string;
  region: string;
}

export type TextSizeMode = 'default' | 'larger' | 'extra-large';

export interface AccessibilitySettings {
  largerText: boolean;
  textSize?: TextSizeMode;
  highContrast: boolean;
  reducedMotion: boolean;
  comfortableSpacing?: boolean;
  simpleInterface: boolean;
}

export interface NotificationSettings {
  orderUpdates: boolean;
  deliveryUpdates: boolean;
  buyerInterest: boolean;
  marketPrices: boolean;
  generalAnnouncements: boolean;
}

export interface VerificationItemStatus {
  title: string;
  status: 'Completed' | 'Pending' | 'Not started';
  description: string;
  note?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type ChatActionType = 'navigate' | 'open_add_harvest' | 'open_help_center' | 'prompt';

export interface ChatAction {
  label: string;
  actionType: ChatActionType;
  targetTab?: FarmerTab | BuyerTab | LogisticsTab | string;
  promptText?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  isGreeting?: boolean;
}

export interface ChatbotTopicResponse {
  id: string;
  keywords: string[];
  category: string;
  title: string;
  content: {
    en: string;
    ta?: string;
    hi?: string;
    te?: string;
    ml?: string;
    kn?: string;
  };
  actions?: ChatAction[];
}

export type BuyerRequestStatus = 'Submitted' | 'Under Review' | 'Accepted' | 'Closed';

export interface BuyerInterestRequest {
  id: string;
  harvestId: string;
  harvestCode: string;
  cropName: string;
  variety?: string;
  farmerName: string;
  farmerLocation: string;
  requestedQuantity: number;
  unit: string;
  intendedUse: string;
  pickupPreference: string;
  preferredDate: string;
  expectedPrice: number;
  totalEstimatedValue: number;
  message?: string;
  status: BuyerRequestStatus;
  submittedAt: string;
  updatedAt?: string;
  isDemoData?: boolean;
}

export interface BuyerProfileData {
  businessName: string;
  buyerType: BuyerType;
  contactPerson: string;
  mobile: string;
  email: string;
  city: string;
  district: string;
  state: string;
  preferredCrops: string[];
  preferredFulfillment: PickupDeliveryPref;
  verificationStatus: string;
  gstNumber?: string;
  fssaiNumber?: string;
  preferredLanguage: string;
}

export type LogisticsTab = 'dashboard' | 'deliveries' | 'route' | 'history' | 'notifications' | 'profile';

export type LogisticsDeliveryStatus = 
  | 'Assigned' 
  | 'Pickup Pending' 
  | 'Picked Up' 
  | 'In Transit' 
  | 'Delivered' 
  | 'Cancelled';

export interface LogisticsTimelineEvent {
  id: string;
  stage: string;
  title: string;
  timestamp: string;
  description: string;
  statusBadge?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export interface LogisticsRouteWaypoint {
  name: string;
  type: 'pickup' | 'hub' | 'dropoff';
  address: string;
  contactPerson?: string;
  contactPhone?: string;
  eta?: string;
  completed?: boolean;
  notes?: string;
}

export interface LogisticsRouteInfo {
  pickupLocation: string;
  intermediateStop?: string;
  dropoffLocation: string;
  approxDistanceKm: number;
  estimatedTravelTime: string;
  routeStatus: string;
  highwayCorridor: string;
  waypoints: LogisticsRouteWaypoint[];
  isDemoData?: boolean;
}

export interface LogisticsDeliveryItem {
  id: string;
  deliveryCode: string;
  orderCode: string;
  harvestRef?: string;
  produceName: string;
  category: string;
  quantity: number;
  unit: string;
  packagingType: string;
  
  // Pickup Information
  farmerName: string;
  farmerPhone?: string;
  pickupLocation: string;
  pickupAddress: string;
  pickupDate: string;
  pickupTime: string;
  pickupInstructions?: string;
  
  // Drop-off Information
  buyerName: string;
  buyerPhone?: string;
  deliveryLocation: string;
  deliveryAddress: string;
  expectedDate: string;
  expectedTime: string;
  deliveryInstructions?: string;
  
  // Assignment & Fleet
  logisticsPartner: string;
  vehicleType: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  
  // Status & Timeline
  status: LogisticsDeliveryStatus;
  timeline: LogisticsTimelineEvent[];
  routeInfo: LogisticsRouteInfo;
  
  // Proof of Delivery
  podConfirmation?: {
    confirmedAt: string;
    method: 'Buyer confirmation' | 'Delivery code verified' | 'Manual confirmation';
    verifiedCode?: string;
    note?: string;
    receivedBy?: string;
  };
  
  assignedDate: string;
  completedDate?: string;
  isDemoData?: boolean;
}

export interface LogisticsProfileData {
  driverName: string;
  companyName: string;
  serviceArea: string;
  mobile: string;
  email: string;
  vehicleType: string;
  vehicleNo: string;
  drivingLicenseNo: string;
  availabilityStatus: 'Available' | 'On Duty' | 'Off Duty';
  preferredLanguage: string;
  experienceYears: number;
  totalDeliveriesCompleted: number;
  onTimeRating: string;
  preferredCorridors: string[];
}

export interface LogisticsNotificationItem {
  id: string;
  deliveryCode?: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'assigned' | 'pickup' | 'status' | 'completed' | 'alert';
}

export type NotificationCategory = 
  | 'Orders' 
  | 'Deliveries' 
  | 'Payments' 
  | 'Marketplace' 
  | 'Account' 
  | 'Announcements';

export interface SharedNotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: NotificationCategory;
  read: boolean;
  role: RoleType | 'admin' | 'all';
  relatedModule?: string;
  actionLinkTab?: string;
  isDemoData?: boolean;
}

export interface NotificationPreferences {
  orderUpdates: boolean;
  deliveryUpdates: boolean;
  paymentUpdates: boolean;
  marketplaceUpdates: boolean;
  announcements: boolean;
}

export type SupportCategory = 
  | 'Account Help' 
  | 'Listing Help' 
  | 'Order Help' 
  | 'Delivery Help' 
  | 'Payment Information' 
  | 'Technical Issue' 
  | 'General Question';

export type SupportRequestStatus = 'Submitted' | 'Under Review' | 'Resolved';

export interface SupportRequestItem {
  id: string;
  referenceId: string;
  userRole: RoleType | 'admin';
  category: SupportCategory;
  subject: string;
  description: string;
  relatedEntityId?: string;
  createdAt: string;
  status: SupportRequestStatus;
  responseNote?: string;
  isDemoData?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  role: RoleType | 'admin' | 'all';
  keywords: string[];
}

// ==========================================
// ADMIN DASHBOARD & PLATFORM MANAGEMENT TYPES
// ==========================================

export type AdminTab = 
  | 'dashboard' 
  | 'users' 
  | 'listings' 
  | 'orders' 
  | 'activity' 
  | 'reports' 
  | 'notifications' 
  | 'settings';

export type AdminUserRole = 'Farmer' | 'Buyer' | 'Logistics';
export type AdminUserStatus = 'Active' | 'Pending Review' | 'Inactive';

export interface AdminUserItem {
  id: string;
  userId: string;
  name: string;
  role: AdminUserRole;
  district: string;
  state: string;
  status: AdminUserStatus;
  joinedDate: string;
  phoneDemo: string;
  emailDemo: string;
  totalListingsOrOrders: number;
  verificationBadge: string;
  notes?: string;
  isDemoData?: boolean;
}

export type AdminListingStatus = 'Published' | 'Pending Review' | 'Paused' | 'Archived';

export interface AdminListingItem {
  id: string;
  listingId: string;
  cropName: string;
  category: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  unit: string;
  expectedPrice: number;
  qualityGrade: string;
  location: string;
  district: string;
  state: string;
  publishedDate: string;
  harvestDate: string;
  status: AdminListingStatus;
  reviewNotes?: string;
  isDemoData?: boolean;
}

export interface AdminOrderItem {
  id: string;
  orderId: string;
  listingId: string;
  cropName: string;
  quantity: number;
  unit: string;
  totalAmount: number;
  buyerName: string;
  farmerName: string;
  logisticsPartner: string;
  orderStatus: 'Confirmed' | 'In Transit' | 'Delivered' | 'Cancelled';
  logisticsStatus: 'Pickup Pending' | 'In Transit' | 'Out for Delivery' | 'Completed';
  createdDate: string;
  deliveryDate?: string;
  escrowStatus: 'Locked in Escrow' | 'Released to Farmer' | 'Refunded';
  isDemoData?: boolean;
}

export type AdminActivityCategory = 'Listings' | 'Users' | 'Deliveries' | 'Reviews' | 'Settings' | 'System';

export interface AdminActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: AdminActivityCategory;
  relatedModule: string;
  severity?: 'info' | 'success' | 'warning';
  isDemoData?: boolean;
}

export interface AdminReportItem {
  id: string;
  title: string;
  category: 'Marketplace Activity' | 'Crop Listing Summary' | 'Delivery Summary' | 'User Overview';
  description: string;
  period: string;
  keyMetric: string;
  recordCount: number;
  summaryData: Array<{ label: string; value: string | number }>;
  isDemoData?: boolean;
}

export interface AdminMetrics {
  registeredFarmers: number;
  registeredBuyers: number;
  logisticsPartners: number;
  activeListings: number;
  activeOrders: number;
  completedDeliveries: number;
  pendingListingsReview: number;
  pendingUsersReview: number;
  totalEscrowProtected: string;
}







