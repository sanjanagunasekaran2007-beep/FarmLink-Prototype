/**
 * ==========================================================================
 * FARMLINK PROTOTYPE — CORE APPLICATION SCRIPT
 * Premium AgriTech AI Marketplace
 * ==========================================================================
 */

// ==========================================================================
// 1. CONFIG & CANONICAL DEMO DATA (PRESERVED EXACTLY)
// ==========================================================================
const CANONICAL_DATA = {
  profile: {
    name: "Sanjana Devi",
    role: "Farmer",
    mobile: "9876543210",
    email: "sanjana.devi@farmlink.in",
    state: "Maharashtra",
    district: "Nashik",
    village: "Pimpalgaon",
    crops: "Tomato, Onion",
    farmSize: "4.5",
    language: "en",
    rating: "98 / 100",
    gradeCert: "Grade A Certified"
  },
  lots: [
    {
      id: "FL-2026-0003",
      crop: "Tomato",
      variety: "Hybrid Red",
      quantity: 500,
      unit: "kg",
      grade: "Grade A",
      expectedPrice: 32,
      harvestDate: "2026-09-07",
      status: "NEGOTIATING",
      location: "Nashik, Maharashtra",
      pincode: "422209",
      notes: "Graded & crate-packed, high firmness"
    }
  ],
  buyers: [
    {
      id: "BUYER-01",
      name: "FreshFoods",
      matchScore: 98,
      verified: true,
      offeredPrice: 30,
      reliability: 96,
      fulfillment: "Pickup available",
      distance: "18 km away",
      rating: "4.9 ★ (140+ deals)",
      dailyDemand: "12,000 kg",
      badge: "Top Match"
    },
    {
      id: "BUYER-02",
      name: "AgroMart",
      matchScore: 91,
      verified: true,
      offeredPrice: 29,
      reliability: 92,
      fulfillment: "Hub Delivery",
      distance: "32 km away",
      rating: "4.7 ★ (85 deals)",
      dailyDemand: "8,500 kg",
      badge: "High Demand"
    },
    {
      id: "BUYER-03",
      name: "GreenHarvest",
      matchScore: 87,
      verified: true,
      offeredPrice: 28.5,
      reliability: 89,
      fulfillment: "Farmgate Pickup",
      distance: "25 km away",
      rating: "4.6 ★ (62 deals)",
      dailyDemand: "5,000 kg",
      badge: "Direct Buyer"
    }
  ],
  offers: [
    {
      id: "OFF-2026-0012",
      buyerName: "FreshFoods",
      crop: "Tomato",
      quantity: 500,
      unit: "kg",
      offerPrice: 30,
      totalAmount: 15000,
      status: "PENDING", // PENDING | ACCEPTED | COUNTERED | REJECTED
      counterPrice: null,
      lotId: "FL-2026-0003",
      createdAt: "Today, 10:15 AM",
      history: [
        { time: "10:15 AM", actor: "FreshFoods", action: "Sent initial offer of ₹30/kg for 500 kg (Total: ₹15,000)" }
      ]
    }
  ],
  shipment: {
    id: "SHIP-2026-0002",
    lotId: "FL-2026-0003",
    crop: "Tomato",
    quantity: 500,
    buyer: "FreshFoods",
    provider: "AgriMove Logistics",
    vehicleNumber: "MH-15-EG-4921",
    status: "ASSIGNED", // ASSIGNED | PICKUP SCHEDULED | PICKED UP | IN TRANSIT | DELIVERED
    stepIndex: 3, // 1 to 7
    eta: "07 Sept, 04:30 PM",
    origin: "Nashik Farm, Maharashtra",
    destination: "FreshFoods Central Hub, Pune"
  },
  payment: {
    id: "PAY-2026-0001",
    lotId: "FL-2026-0003",
    amount: 15000,
    buyer: "FreshFoods",
    status: "PAYMENT PENDING", // PAYMENT PENDING | PROCESSING | COMPLETED
    escrowReady: true,
    bankAccount: "State Bank of India •••• 8842"
  },
  notifications: [
    {
      id: "NOTIF-1",
      title: "FreshFoods sent an offer",
      message: "₹30/kg for Tomato (Lot FL-2026-0003).",
      time: "2 minutes ago",
      read: false,
      type: "offer"
    },
    {
      id: "NOTIF-2",
      title: "Shipment provider assigned",
      message: "AgriMove Logistics assigned to SHIP-2026-0002.",
      time: "10 minutes ago",
      read: false,
      type: "logistics"
    },
    {
      id: "NOTIF-3",
      title: "FarmLink AI recommendation",
      message: "Market trend rising. Recommended negotiation range: ₹31–₹32/kg.",
      time: "1 hour ago",
      read: false,
      type: "ai"
    }
  ],
  aiRecommendation: {
    action: "NEGOTIATE",
    recommendedRange: "₹31–₹32/kg",
    confidence: "93%",
    rationale: "Market arrivals in Pune and Nashik are 18% lower this week. FreshFoods has sent an offer of ₹30/kg, but high demand allows you to counter-offer around ₹31–₹32/kg with a 91% acceptance probability."
  },
  cropsMarketData: {
    Tomato: {
      name: "Tomato",
      currentPrice: 28,
      change: "+8.2%",
      trend: "up",
      demand: "High Demand",
      history7Days: [24, 24.5, 25.5, 26, 26.8, 27.5, 28],
      mandis: [
        { name: "Nashik APMC", dist: "12 km", modal: "₹28/kg", max: "₹30/kg", arrivals: "340 qtl", net: "+₹1,200", isBest: true },
        { name: "Pune APMC", dist: "140 km", modal: "₹31/kg", max: "₹33/kg", arrivals: "620 qtl", net: "+₹1,800", isBest: false },
        { name: "Mumbai (Vashi)", dist: "165 km", modal: "₹33/kg", max: "₹35/kg", arrivals: "1,100 qtl", net: "+₹2,100", isBest: false },
        { name: "Azadpur (Delhi)", dist: "1,200 km", modal: "₹36/kg", max: "₹38/kg", arrivals: "2,400 qtl", net: "+₹900", isBest: false }
      ]
    },
    Onion: {
      name: "Onion",
      currentPrice: 34,
      change: "+5.7%",
      trend: "up",
      demand: "Rising",
      history7Days: [30, 31, 31.5, 32, 33, 33.5, 34],
      mandis: [
        { name: "Lasalgaon Mandi", dist: "35 km", modal: "₹34/kg", max: "₹36/kg", arrivals: "1,850 qtl", net: "+₹2,400", isBest: true },
        { name: "Pimpalgaon APMC", dist: "18 km", modal: "₹33.5/kg", max: "₹35/kg", arrivals: "920 qtl", net: "+₹2,100", isBest: false },
        { name: "Pune Market Yard", dist: "140 km", modal: "₹36/kg", max: "₹38/kg", arrivals: "1,400 qtl", net: "+₹2,600", isBest: false }
      ]
    },
    Wheat: {
      name: "Wheat",
      currentPrice: 27,
      change: "-1.8%",
      trend: "down",
      demand: "Stable",
      history7Days: [28.5, 28.2, 28, 27.8, 27.5, 27.2, 27],
      mandis: [
        { name: "Nashik APMC", dist: "12 km", modal: "₹27/kg", max: "₹28.5/kg", arrivals: "410 qtl", net: "Normal", isBest: true },
        { name: "Indore Mandi", dist: "380 km", modal: "₹28.2/kg", max: "₹29.5/kg", arrivals: "2,200 qtl", net: "+₹400", isBest: false }
      ]
    },
    Cotton: {
      name: "Cotton",
      currentPrice: 72,
      change: "+3.4%",
      trend: "up",
      demand: "Active",
      history7Days: [68, 69, 69.5, 70, 71, 71.5, 72],
      mandis: [
        { name: "Jalgaon APMC", dist: "180 km", modal: "₹72/kg", max: "₹75/kg", arrivals: "740 qtl", net: "+₹3,500", isBest: true },
        { name: "Aurangabad Mandi", dist: "190 km", modal: "₹71.5/kg", max: "₹74/kg", arrivals: "610 qtl", net: "+₹3,200", isBest: false }
      ]
    },
    Potato: {
      name: "Potato",
      currentPrice: 24,
      change: "-2.1%",
      trend: "down",
      demand: "Stable",
      history7Days: [25.5, 25.2, 25, 24.8, 24.5, 24.2, 24],
      mandis: [
        { name: "Nashik APMC", dist: "12 km", modal: "₹24/kg", max: "₹26/kg", arrivals: "520 qtl", net: "Normal", isBest: true },
        { name: "Pune APMC", dist: "140 km", modal: "₹25.5/kg", max: "₹27/kg", arrivals: "850 qtl", net: "+₹300", isBest: false }
      ]
    }
  }
};

// ==========================================================================
// 2. LOCAL STORAGE & STATE MANAGER
// ==========================================================================
const State = {
  isLoggedIn: true,
  theme: "light",
  language: "en",
  activeView: "dashboard",
  selectedCrop: "Tomato",
  profile: null,
  lots: [],
  buyers: [],
  offers: [],
  shipment: null,
  payment: null,
  notifications: [],

  init() {
    const authSaved = localStorage.getItem("farmlink_auth");
    this.isLoggedIn = authSaved ? JSON.parse(authSaved).isLoggedIn : true;

    // Theme: default to light
    this.theme = localStorage.getItem("farmlink_theme") || "light";
    document.documentElement.setAttribute("data-theme", this.theme);

    // Language
    this.language = localStorage.getItem("farmlink_language") || "en";

    // Profile
    const savedProf = localStorage.getItem("farmlink_profile");
    this.profile = savedProf ? JSON.parse(savedProf) : { ...CANONICAL_DATA.profile };

    // Lots
    const savedLots = localStorage.getItem("farmlink_lots");
    this.lots = savedLots ? JSON.parse(savedLots) : [...CANONICAL_DATA.lots];

    // Buyers
    this.buyers = [...CANONICAL_DATA.buyers];

    // Offers
    const savedOffers = localStorage.getItem("farmlink_offers");
    this.offers = savedOffers ? JSON.parse(savedOffers) : JSON.parse(JSON.stringify(CANONICAL_DATA.offers));

    // Shipment
    const savedShipment = localStorage.getItem("farmlink_shipment");
    this.shipment = savedShipment ? JSON.parse(savedShipment) : { ...CANONICAL_DATA.shipment };

    // Payment
    const savedPayment = localStorage.getItem("farmlink_payment");
    this.payment = savedPayment ? JSON.parse(savedPayment) : { ...CANONICAL_DATA.payment };

    // Notifications
    const savedNotifs = localStorage.getItem("farmlink_notifications");
    this.notifications = savedNotifs ? JSON.parse(savedNotifs) : JSON.parse(JSON.stringify(CANONICAL_DATA.notifications));
  },

  save(key) {
    if (key === "auth" || !key) localStorage.setItem("farmlink_auth", JSON.stringify({ isLoggedIn: this.isLoggedIn }));
    if (key === "profile" || !key) localStorage.setItem("farmlink_profile", JSON.stringify(this.profile));
    if (key === "lots" || !key) localStorage.setItem("farmlink_lots", JSON.stringify(this.lots));
    if (key === "offers" || !key) localStorage.setItem("farmlink_offers", JSON.stringify(this.offers));
    if (key === "shipment" || !key) localStorage.setItem("farmlink_shipment", JSON.stringify(this.shipment));
    if (key === "payment" || !key) localStorage.setItem("farmlink_payment", JSON.stringify(this.payment));
    if (key === "notifications" || !key) localStorage.setItem("farmlink_notifications", JSON.stringify(this.notifications));
    if (key === "theme" || !key) localStorage.setItem("farmlink_theme", this.theme);
    if (key === "language" || !key) localStorage.setItem("farmlink_language", this.language);
  }
};

// ==========================================================================
// 3. I18N / TRANSLATIONS
// ==========================================================================
const TRANSLATIONS = {
  en: {
    marketplace_ops: "Marketplace",
    fulfillment: "Fulfillment & Operations",
    nav_dashboard: "Dashboard",
    nav_market: "Market Intelligence",
    nav_lots: "My Lots",
    nav_buyers: "Find Buyers",
    nav_offers: "Offers",
    nav_logistics: "Logistics",
    nav_payments: "Payments",
    nav_grievances: "Grievances",
    nav_fpo: "FPO",
    nav_profile: "Profile",
    nav_logout: "Logout",
    farmer_badge: "Farmer",
    explore_markets: "Explore Markets",
    publish_new_lot: "Publish New Lot"
  },
  ta: {
    marketplace_ops: "சந்தை",
    fulfillment: "சரக்கு & செயல்பாடுகள்",
    nav_dashboard: "முகப்பு பலகை",
    nav_market: "சந்தை நிலவரம்",
    nav_lots: "எனது குவியல்கள்",
    nav_buyers: "வாங்குபவர்கள்",
    nav_offers: "விலை வாய்ப்புகள்",
    nav_logistics: "சரக்குப் போக்குவரத்து",
    nav_payments: "பணம் செலுத்துதல்",
    nav_grievances: "புகார்கள்",
    nav_fpo: "உழவர் குழு (FPO)",
    nav_profile: "சுயவிவரம்",
    nav_logout: "வெளியேறு",
    farmer_badge: "விவசாயி",
    explore_markets: "சந்தைகளை ஆராய்க",
    publish_new_lot: "புதிய குவியல்"
  },
  hi: {
    marketplace_ops: "मार्केटप्लेस",
    fulfillment: "लॉजिस्टिक्स व परिचालन",
    nav_dashboard: "डैशबोर्ड",
    nav_market: "मंडी भाव",
    nav_lots: "मेरी फसलें",
    nav_buyers: "खरीदार",
    nav_offers: "प्रस्ताव",
    nav_logistics: "परिवहन",
    nav_payments: "भुगतान",
    nav_grievances: "शिकायत",
    nav_fpo: "FPO समूह",
    nav_profile: "प्रोफाइल",
    nav_logout: "लॉगआउट",
    farmer_badge: "किसान",
    explore_markets: "मंडी भाव देखें",
    publish_new_lot: "नई फसल जोड़ें"
  },
  te: {
    marketplace_ops: "మార్కెట్‌ప్లేస్",
    fulfillment: "రవాణా & చెల్లింపులు",
    nav_dashboard: "డ్యాష్‌బోర్డ్",
    nav_market: "మార్కెట్ సమాచారం",
    nav_lots: "నా పంటలు",
    nav_buyers: "కొనుగోలుదారులు",
    nav_offers: "ఆఫర్లు",
    nav_logistics: "రవాణా",
    nav_payments: "చెల్లింపులు",
    nav_grievances: "ఫిర్యాదులు",
    nav_fpo: "FPO సమాఖ్య",
    nav_profile: "ప్రొఫైల్",
    nav_logout: "లాగౌట్",
    farmer_badge: "రైతు",
    explore_markets: "మార్కెట్లను అన్వేషించండి",
    publish_new_lot: "కొత్త పంట"
  },
  ml: {
    marketplace_ops: "മാർക്കറ്റ്",
    fulfillment: "വിതരണവും പ്രവർത്തനങ്ങളും",
    nav_dashboard: "ഡാഷ്‌ബോർഡ്",
    nav_market: "വിപണി വിവരങ്ങൾ",
    nav_lots: "എന്റെ വിളകൾ",
    nav_buyers: "വാങ്ങുന്നവർ",
    nav_offers: "ഓഫറുകൾ",
    nav_logistics: "ചരക്കുനീക്കം",
    nav_payments: "പേയ്‌മെന്റുകൾ",
    nav_grievances: "പരാതികൾ",
    nav_fpo: "FPO കൂട്ടായ്മ",
    nav_profile: "പ്രൊഫൈൽ",
    nav_logout: "ലോഗൗട്ട്",
    farmer_badge: "കർഷകൻ",
    explore_markets: "വിപണികൾ കാണുക",
    publish_new_lot: "വിള ചേർക്കുക"
  },
  kn: {
    marketplace_ops: "ಮಾರುಕಟ್ಟೆ",
    fulfillment: "ರವಾನೆ & ಕಾರ್ಯಾಚರಣೆ",
    nav_dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    nav_market: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    nav_lots: "ನನ್ನ ಬೆಳೆಗಳು",
    nav_buyers: "ಖರೀದಿದಾರರು",
    nav_offers: "ಆಫರ್‌ಗಳು",
    nav_logistics: "ಸಾರಿಗೆ",
    nav_payments: "ಪಾವತಿಗಳು",
    nav_grievances: "ದೂರುಗಳು",
    nav_fpo: "FPO ಗುಂಪು",
    nav_profile: "ಪ್ರೊಫೈಲ್",
    nav_logout: "ಲಾಗ್‌ಔಟ್",
    farmer_badge: "ರೈತ",
    explore_markets: "ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    publish_new_lot: "ಹೊಸ ಬೆಳೆ"
  }
};

// ==========================================================================
// 4. TOAST SYSTEM
// ==========================================================================
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  let icon = "✓";
  if (type === "error") icon = "✕";
  else if (type === "info") icon = "ℹ";

  toast.innerHTML = `
    <span style="color:${type === 'error' ? 'var(--status-rejected-border)' : 'var(--harvest-gold)'}; font-weight:800;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 2800);
}

// ==========================================================================
// 5. AUTH HANDLERS
// ==========================================================================
function switchAuthTab(tab) {
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const secLogin = document.getElementById("auth-login-section");
  const secRegister = document.getElementById("auth-register-section");

  if (tab === "login") {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    secLogin.style.display = "block";
    secRegister.style.display = "none";
  } else {
    tabLogin.classList.remove("active");
    tabRegister.classList.add("active");
    secLogin.style.display = "none";
    secRegister.style.display = "block";
  }
}

function fillDemoCredentials() {
  document.getElementById("login-mobile").value = "9876543210";
  document.getElementById("login-password").value = "123456";
  showToast("Demo credentials autofilled", "info");
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const mobile = document.getElementById("login-mobile").value.trim();
  const pass = document.getElementById("login-password").value.trim();

  if (mobile === "9876543210" && pass === "123456") {
    executeLoginSuccess("Sanjana Devi");
  } else {
    showToast("Use demo credentials: 9876543210 / 123456", "error");
  }
}

function handleDemoQuickLogin() {
  executeLoginSuccess("Sanjana Devi");
}

function executeLoginSuccess(userName) {
  State.isLoggedIn = true;
  State.save("auth");

  document.getElementById("view-auth").classList.remove("active");
  document.getElementById("view-auth").style.display = "none";
  document.getElementById("app-shell").style.display = "flex";

  renderAllViews();
  navigate("dashboard");
  showToast(`Welcome back, ${userName}!`, "success");
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const mobile = document.getElementById("reg-mobile").value.trim();
  const email = document.getElementById("reg-email").value.trim() || `${mobile}@farmlink.in`;
  const state = document.getElementById("reg-state").value;
  const district = document.getElementById("reg-district").value.trim();
  const village = document.getElementById("reg-village").value.trim();
  const crop = document.getElementById("reg-crop").value;
  const farmSize = document.getElementById("reg-farmsize").value.trim();
  const lang = document.getElementById("reg-lang").value;

  if (!name || !mobile) {
    showToast("Please fill in required fields.", "error");
    return;
  }

  State.profile = {
    ...State.profile,
    name,
    mobile,
    email,
    state,
    district,
    village,
    crops: crop,
    farmSize,
    language: lang
  };
  State.save("profile");

  showToast("Account created successfully! Please log in.", "success");
  switchAuthTab("login");
  fillDemoCredentials();
}

function handleLogout() {
  State.isLoggedIn = false;
  State.save("auth");

  document.getElementById("app-shell").style.display = "none";
  const authView = document.getElementById("view-auth");
  authView.style.display = "flex";
  authView.classList.add("active");

  showToast("Logged out of FarmLink demo session.", "info");
}

// ==========================================================================
// 6. NAVIGATION & SPA ROUTING
// ==========================================================================
function navigate(viewName) {
  State.activeView = viewName;

  const views = document.querySelectorAll(".content-wrapper .app-view");
  views.forEach(v => v.classList.remove("active"));

  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll(".sidebar-nav .nav-link").forEach(link => {
    if (link.getAttribute("data-view") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  document.querySelectorAll(".mobile-bottom-nav .mobile-nav-item").forEach(item => {
    if (item.getAttribute("data-view") === viewName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  const sidebar = document.getElementById("app-sidebar");
  if (sidebar && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }

  if (viewName === "dashboard") renderDashboardLiveState();
  if (viewName === "market") renderMarketView();
  if (viewName === "lots") renderLotsView();
  if (viewName === "buyers") renderBuyersView();
  if (viewName === "offers") renderOffersView();
  if (viewName === "logistics") renderLogisticsView();
  if (viewName === "payments") renderPaymentsView();
  if (viewName === "profile") renderProfileView();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectCropAndNavigate(cropName) {
  State.selectedCrop = cropName;
  navigate("market");
}

function toggleSidebar() {
  const sidebar = document.getElementById("app-sidebar");
  sidebar.classList.toggle("open");
}

// ==========================================================================
// 7. THEME & LANGUAGE CONTROLLERS
// ==========================================================================
function toggleTheme() {
  State.theme = State.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", State.theme);
  State.save("theme");

  const darkIcon = document.getElementById("icon-theme-dark");
  const lightIcon = document.getElementById("icon-theme-light");
  if (State.theme === "light") {
    darkIcon.style.display = "block";
    lightIcon.style.display = "none";
  } else {
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
  }

  if (State.activeView === "market") {
    renderMarketPriceChart(State.selectedCrop);
  }

  showToast(`Switched to ${State.theme === "light" ? "Warm Light" : "Dark"} Mode.`, "info");
}

function toggleLanguageMenu() {
  const menu = document.getElementById("lang-menu-dropdown");
  menu.classList.toggle("open");
}

function setLanguage(langCode) {
  State.language = langCode;
  State.save("language");

  document.getElementById("current-lang-code").innerText = langCode.toUpperCase();
  const menu = document.getElementById("lang-menu-dropdown");
  menu.classList.remove("open");

  applyTranslations(langCode);
  showToast(`Language updated to ${langCode.toUpperCase()}.`, "info");
}

function applyTranslations(langCode) {
  const dict = TRANSLATIONS[langCode] || TRANSLATIONS.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });

  const profLangEl = document.getElementById("prof-lang");
  if (profLangEl) {
    profLangEl.innerText = `${langCode.toUpperCase()} (${langCode === "ta" ? "தமிழ்" : "English"})`;
  }
}

document.addEventListener("click", (e) => {
  const dropdown = document.querySelector(".language-dropdown");
  const menu = document.getElementById("lang-menu-dropdown");
  if (dropdown && !dropdown.contains(e.target) && menu) {
    menu.classList.remove("open");
  }
});

// ==========================================================================
// 8. DASHBOARD LIVE STATE ENGINE
// ==========================================================================
function renderDashboardLiveState() {
  const firstName = State.profile.name.split(" ")[0] || "Sanjana";
  document.getElementById("dashboard-greeting").innerText = `Good afternoon, ${firstName}`;
  document.getElementById("header-user-name").innerText = firstName;
  document.getElementById("header-user-avatar").innerText = firstName.charAt(0);
  document.getElementById("header-location-text").innerText = `${State.profile.district || "Nashik"}, ${State.profile.state || "Maharashtra"}`;

  const activeLotsCount = State.lots.filter(l => l.status !== "SOLD").length;
  const pendingOffersCount = State.offers.filter(o => o.status === "PENDING" || o.status === "COUNTERED").length;

  document.getElementById("sidebar-lots-count").innerText = activeLotsCount;
  document.getElementById("sidebar-offers-count").innerText = pendingOffersCount;

  // Logistics & Payment attention cards
  const deliveryEl = document.getElementById("dash-stat-delivery");
  if (deliveryEl) deliveryEl.innerText = State.shipment.status;

  const paymentDesc = document.getElementById("dash-payment-desc");
  if (paymentDesc) {
    paymentDesc.innerText = State.payment.status === "COMPLETED" ? "Payment settled to your SBI bank account." : "Buyer funds deposited in secure escrow.";
  }

  renderDashboardLotsPreview();
  renderDashboardOffersPreview();
}

function renderDashboardLotsPreview() {
  const container = document.getElementById("dash-lots-preview");
  if (!container) return;

  if (State.lots.length === 0) {
    container.innerHTML = `<p style="font-size:0.86rem;color:var(--text-muted);padding:10px 0;">No active crop lots published yet.</p>`;
    return;
  }

  let html = `<div style="display:flex; flex-direction:column; gap:10px;">`;
  State.lots.slice(0, 2).forEach(lot => {
    html += `
      <div style="background:var(--soft-green-surface); border:1px solid var(--soft-sage); border-radius:var(--radius-md); padding:12px 16px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:0.74rem; color:var(--text-muted); font-weight:700;">${lot.id}</div>
          <div style="font-weight:800; font-size:0.96rem; color:var(--primary-forest);">${lot.crop} • ${lot.quantity} ${lot.unit}</div>
          <div style="font-size:0.82rem; color:var(--text-secondary);">${lot.grade} • Expected: <strong style="color:var(--primary-forest);">₹${lot.expectedPrice}/kg</strong></div>
        </div>
        <div>
          <span class="badge ${lot.status === 'NEGOTIATING' ? 'badge-amber' : 'badge-green'}">${lot.status}</span>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function renderDashboardOffersPreview() {
  const container = document.getElementById("dash-offers-preview");
  if (!container) return;

  if (State.offers.length === 0) {
    container.innerHTML = `<p style="font-size:0.86rem;color:var(--text-muted);padding:10px 0;">No buyer offers yet.</p>`;
    return;
  }

  let html = `<div style="display:flex; flex-direction:column; gap:10px;">`;
  State.offers.slice(0, 2).forEach(offer => {
    html += `
      <div style="background:var(--soft-green-surface); border:1px solid var(--soft-sage); border-radius:var(--radius-md); padding:12px 16px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:0.74rem; color:var(--text-muted); font-weight:700;">${offer.buyerName}</div>
          <div style="font-weight:800; font-size:0.96rem; color:var(--primary-forest);">Offer: ₹${offer.offerPrice}/kg (Total: ₹${offer.totalAmount.toLocaleString()})</div>
          <div style="font-size:0.82rem; color:var(--text-secondary);">${offer.crop} • ${offer.quantity} ${offer.unit}</div>
        </div>
        <div>
          <span class="badge ${offer.status === 'ACCEPTED' ? 'badge-green' : offer.status === 'REJECTED' ? 'badge-red' : 'badge-amber'}">${offer.status}</span>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ==========================================================================
// 9. AI ANALYSIS MODAL
// ==========================================================================
function openAIAnalysisModal() {
  const modal = document.getElementById("modal-ai-analysis");
  if (modal) modal.classList.add("open");
}

function handleUseAISuggestedCounter() {
  closeModal("modal-ai-analysis");
  navigate("offers");
  openCounterOfferModal(32);
}

function handleDashboardNegotiate() {
  navigate("offers");
  openCounterOfferModal(32);
}

// ==========================================================================
// 10. MARKET INTELLIGENCE
// ==========================================================================
function renderMarketView() {
  renderCropSelector();
  renderMarketPriceChart(State.selectedCrop);
  renderMandiComparisonTable(State.selectedCrop);
}

function renderCropSelector() {
  const bar = document.getElementById("market-crop-selector");
  if (!bar) return;

  bar.innerHTML = "";
  Object.keys(CANONICAL_DATA.cropsMarketData).forEach(cropKey => {
    const crop = CANONICAL_DATA.cropsMarketData[cropKey];
    const isSelected = cropKey === State.selectedCrop;

    const btn = document.createElement("button");
    btn.className = `btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`;
    btn.style.padding = "9px 16px";
    btn.onclick = () => {
      State.selectedCrop = cropKey;
      renderCropSelector();
      renderMarketPriceChart(cropKey);
      renderMandiComparisonTable(cropKey);
    };

    btn.innerHTML = `
      <strong>${crop.name}</strong> • ₹${crop.currentPrice}/kg <span style="font-size:0.76rem; opacity:0.95;">(${crop.trend === 'up' ? '↑' : '↓'} ${crop.change})</span>
    `;

    bar.appendChild(btn);
  });
}

function renderMarketPriceChart(cropKey) {
  const crop = CANONICAL_DATA.cropsMarketData[cropKey] || CANONICAL_DATA.cropsMarketData.Tomato;
  const svg = document.getElementById("market-price-svg");
  const titleEl = document.getElementById("chart-selected-crop-title");
  const growthBadge = document.getElementById("chart-growth-badge");

  if (titleEl) titleEl.innerText = `${crop.name} price trend (7 days)`;
  if (growthBadge) {
    growthBadge.className = `badge ${crop.trend === 'up' ? 'badge-green' : 'badge-red'}`;
    growthBadge.innerText = `${crop.trend === 'up' ? '↑' : '↓'} ${crop.change} this week`;
  }

  if (!svg) return;

  const data = crop.history7Days;
  const minVal = Math.min(...data) - 2;
  const maxVal = Math.max(...data) + 2;
  const range = maxVal - minVal;

  const width = 800;
  const height = 220;
  const padding = 32;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return { x, y, val };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX1 = prev.x + (curr.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (curr.x - prev.x) / 2;
    const cpY2 = curr.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  const strokeColor = crop.trend === "up" ? "#1F5135" : "#A82E20";

  let dotsHtml = "";
  points.forEach((pt, idx) => {
    const isLatest = idx === points.length - 1;
    const dotFill = isLatest ? "#D9A441" : "#FFFFFF";
    const dotStroke = isLatest ? "#D9A441" : strokeColor;
    const dotRadius = isLatest ? 6 : 4.5;
    dotsHtml += `
      <circle cx="${pt.x}" cy="${pt.y}" r="${dotRadius}" fill="${dotFill}" stroke="${dotStroke}" stroke-width="2.5" style="cursor:pointer;"
        onmouseover="showChartTooltip(event, '${crop.name}: ₹${pt.val}/kg${isLatest ? ' (Today)' : ''}', ${pt.x}, ${pt.y})"
        onmouseout="hideChartTooltip()" />
    `;
  });

  svg.innerHTML = `
    <!-- Grid lines -->
    <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#D9E1D8" stroke-width="1.2"/>
    <line x1="${padding}" y1="${height / 2}" x2="${width - padding}" y2="${height / 2}" stroke="#E7EDE6" stroke-width="1" stroke-dasharray="4"/>
    <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="#E7EDE6" stroke-width="1" stroke-dasharray="4"/>
    
    <!-- Area gradient & Line -->
    <path d="${areaD}" fill="rgba(31, 81, 53, 0.09)"/>
    <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round"/>
    ${dotsHtml}
  `;
}

function showChartTooltip(event, text, x, y) {
  const tooltip = document.getElementById("chart-tooltip");
  if (!tooltip) return;
  tooltip.innerText = text;
  tooltip.style.left = `${(x / 800) * 100}%`;
  tooltip.style.top = `${y}px`;
  tooltip.style.display = "block";
}

function hideChartTooltip() {
  const tooltip = document.getElementById("chart-tooltip");
  if (tooltip) tooltip.style.display = "none";
}

function renderMandiComparisonTable(cropKey) {
  const crop = CANONICAL_DATA.cropsMarketData[cropKey] || CANONICAL_DATA.cropsMarketData.Tomato;
  const tbody = document.getElementById("mandi-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  crop.mandis.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${m.name}</strong> ${m.isBest ? '<span class="badge badge-green" style="font-size:0.68rem;margin-left:6px;">Recommended</span>' : ''}</td>
      <td>${m.dist}</td>
      <td style="font-weight:800; color:var(--text-main);">${m.modal}</td>
      <td style="color:var(--primary-forest); font-weight:800;">${m.max}</td>
      <td>${m.arrivals}</td>
      <td style="color:var(--primary-forest); font-weight:800;">${m.net}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="openCreateLotModalForCrop('${crop.name}', '${m.name}')">Sell Here</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openCreateLotModalForCrop(cropName, mandiName) {
  openCreateLotModal();
  const cropSelect = document.getElementById("lot-crop");
  if (cropSelect) cropSelect.value = cropName;
  showToast(`Pre-selected ${cropName} for ${mandiName}.`, "info");
}

// ==========================================================================
// 11. MY LOTS & CREATE LOT
// ==========================================================================
function renderLotsView() {
  const tbody = document.getElementById("lots-table-body");
  const countAll = document.getElementById("count-lots-all");
  if (!tbody) return;

  if (countAll) countAll.innerText = State.lots.length;

  tbody.innerHTML = "";
  State.lots.forEach(lot => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong style="font-size:0.88rem; color:var(--primary-forest);">${lot.id}</strong></td>
      <td><strong>${lot.crop}</strong> (${lot.variety})</td>
      <td>${lot.quantity} ${lot.unit}</td>
      <td>${lot.grade}</td>
      <td style="color:var(--primary-forest); font-weight:800;">₹${lot.expectedPrice} / kg</td>
      <td><span class="badge ${lot.status === 'NEGOTIATING' ? 'badge-amber' : 'badge-green'}">${lot.status}</span></td>
      <td>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm btn-primary" onclick="navigate('buyers')">Find Buyers</button>
          <button class="btn btn-sm btn-secondary" onclick="openAIAnalysisModal()">AI Advice</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterLots(status, btn) {
  document.querySelectorAll("#view-lots .btn-secondary, #view-lots .btn-outline").forEach(b => b.classList.remove("active-filter"));
  if (btn) btn.classList.add("active-filter");

  const tbody = document.getElementById("lots-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  const filtered = status === "all" ? State.lots : State.lots.filter(l => l.status === status);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:34px; color:var(--text-muted);">No lots found for '${status}'.</td></tr>`;
    return;
  }

  filtered.forEach(lot => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong style="color:var(--primary-forest);">${lot.id}</strong></td>
      <td><strong>${lot.crop}</strong> (${lot.variety})</td>
      <td>${lot.quantity} ${lot.unit}</td>
      <td>${lot.grade}</td>
      <td style="color:var(--primary-forest); font-weight:800;">₹${lot.expectedPrice} / kg</td>
      <td><span class="badge ${lot.status === 'NEGOTIATING' ? 'badge-amber' : 'badge-green'}">${lot.status}</span></td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="navigate('buyers')">Find Buyers</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openCreateLotModal() {
  const modal = document.getElementById("modal-create-lot");
  if (modal) modal.classList.add("open");
}

function handlePublishLotSubmit(event) {
  event.preventDefault();
  const crop = document.getElementById("lot-crop").value;
  const variety = document.getElementById("lot-variety").value.trim() || "Standard";
  const quantity = parseFloat(document.getElementById("lot-qty").value) || 500;
  const unit = document.getElementById("lot-unit").value;
  const grade = document.getElementById("lot-grade").value;
  const expectedPrice = parseFloat(document.getElementById("lot-price").value) || 30;
  const harvestDate = document.getElementById("lot-harvest").value || "2026-09-08";
  const pincode = document.getElementById("lot-pincode").value.trim() || "422209";
  const notes = document.getElementById("lot-notes").value.trim();

  const newLotId = `FL-2026-000${State.lots.length + 4}`;

  const newLot = {
    id: newLotId,
    crop,
    variety,
    quantity,
    unit,
    grade,
    expectedPrice,
    harvestDate,
    status: "ACTIVE",
    location: `${State.profile.district || 'Nashik'}, ${State.profile.state || 'Maharashtra'}`,
    pincode,
    notes
  };

  State.lots.unshift(newLot);
  State.save("lots");

  closeModal("modal-create-lot");
  renderLotsView();
  renderDashboardLiveState();

  addNotification({
    id: `NOTIF-${Date.now()}`,
    title: "Lot published",
    message: `Lot ${newLotId} (${crop} ${quantity}${unit}) is now live.`,
    time: "Just now",
    read: false,
    type: "lot"
  });

  showToast("Lot published successfully.", "success");
}

// ==========================================================================
// 12. BUYERS & BUYER DETAILS
// ==========================================================================
function renderBuyersView() {
  const container = document.getElementById("buyers-grid-container");
  if (!container) return;

  container.innerHTML = "";
  State.buyers.forEach(buyer => {
    const card = document.createElement("div");
    card.className = "entity-card";
    card.innerHTML = `
      <div>
        <div class="entity-card-header">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <h3 class="entity-title">${buyer.name}</h3>
              <span class="badge badge-green" style="font-size:0.7rem;">✓ Verified</span>
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:3px;">${buyer.rating} • ${buyer.distance}</div>
          </div>
          <span class="badge badge-green" style="font-size:0.8rem; font-weight:800;">${buyer.matchScore}% Match</span>
        </div>

        <div class="entity-meta-grid">
          <div>
            <div class="meta-item-label">Current Offer</div>
            <div class="meta-item-val" style="color:var(--primary-forest);">₹${buyer.offeredPrice} / kg</div>
          </div>
          <div>
            <div class="meta-item-label">Payment Reliability</div>
            <div class="meta-item-val">${buyer.reliability}% On-Time</div>
          </div>
          <div>
            <div class="meta-item-label">Pickup</div>
            <div class="meta-item-val">${buyer.fulfillment}</div>
          </div>
          <div>
            <div class="meta-item-label">Daily Demand</div>
            <div class="meta-item-val">${buyer.dailyDemand}</div>
          </div>
        </div>
      </div>

      <div class="entity-actions">
        <button class="btn btn-primary btn-block" onclick="openBuyerDetailsModal('${buyer.id}')">
          View Offer & Details
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openBuyerDetailsModal(buyerId) {
  const buyer = State.buyers.find(b => b.id === buyerId) || State.buyers[0];
  const modal = document.getElementById("modal-buyer-details");
  const title = document.getElementById("buyer-modal-title");
  const content = document.getElementById("buyer-modal-content");

  if (!modal || !content) return;

  if (title) title.innerText = `${buyer.name} Details`;

  content.innerHTML = `
    <div style="background:var(--soft-green-surface); padding:16px; border-radius:var(--radius-md); border:1.5px solid var(--soft-sage); margin-bottom:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:1.15rem; font-weight:800; color:var(--primary-forest);">${buyer.name} Agro Processing</div>
          <div style="font-size:0.82rem; color:var(--primary-green); font-weight:700;">✓ Escrow Verified • APMC Registered</div>
        </div>
        <span class="badge badge-green" style="font-size:0.82rem; font-weight:800;">${buyer.matchScore}% Match</span>
      </div>
    </div>

    <div class="entity-meta-grid" style="grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:18px;">
      <div>
        <div class="meta-item-label">Offer Price</div>
        <div class="meta-item-val" style="color:var(--primary-forest);">₹${buyer.offeredPrice} / kg</div>
      </div>
      <div>
        <div class="meta-item-label">Payment Reliability</div>
        <div class="meta-item-val">${buyer.reliability}% On-Time Escrow</div>
      </div>
      <div>
        <div class="meta-item-label">Distance</div>
        <div class="meta-item-val">${buyer.distance}</div>
      </div>
      <div>
        <div class="meta-item-label">Pickup</div>
        <div class="meta-item-val">${buyer.fulfillment}</div>
      </div>
    </div>

    <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.45;">
      ${buyer.name} has purchased over ₹42 Lakhs through FarmLink. Escrow funds are deposited into verified bank escrow before pickup is dispatched.
    </p>
  `;

  modal.classList.add("open");
}

function handleMakeOfferToBuyer() {
  closeModal("modal-buyer-details");
  navigate("offers");
  openCounterOfferModal(32);
}

// ==========================================================================
// 13. OFFERS & NEGOTIATION
// ==========================================================================
function renderOffersView() {
  const container = document.getElementById("offers-grid-container");
  const timelineContainer = document.getElementById("negotiation-history-timeline");
  if (!container) return;

  container.innerHTML = "";
  State.offers.forEach(offer => {
    const isPending = offer.status === "PENDING" || offer.status === "COUNTERED";
    const card = document.createElement("div");
    card.className = "entity-card";
    card.innerHTML = `
      <div>
        <div class="entity-card-header">
          <div>
            <div class="entity-id">${offer.id} • Lot ${offer.lotId}</div>
            <h3 class="entity-title">${offer.buyerName}</h3>
          </div>
          <span class="badge ${offer.status === 'ACCEPTED' ? 'badge-green' : offer.status === 'REJECTED' ? 'badge-red' : 'badge-amber'}">${offer.status}</span>
        </div>

        <div class="entity-meta-grid">
          <div>
            <div class="meta-item-label">Produce Batch</div>
            <div class="meta-item-val">${offer.crop} (${offer.quantity} ${offer.unit})</div>
          </div>
          <div>
            <div class="meta-item-label">Buyer Offer</div>
            <div class="meta-item-val" style="color:var(--status-countered-text);">₹${offer.offerPrice} / kg</div>
          </div>
          <div>
            <div class="meta-item-label">Total Value</div>
            <div class="meta-item-val" style="font-size:1.1rem; color:var(--primary-forest);">₹${offer.totalAmount.toLocaleString()}</div>
          </div>
          <div>
            <div class="meta-item-label">AI Suggested Counter</div>
            <div class="meta-item-val" style="color:var(--primary-forest);">₹31 – ₹32 / kg</div>
          </div>
        </div>

        ${offer.counterPrice ? `
          <div style="background:var(--status-countered-bg); border:1.5px solid var(--status-countered-border); padding:10px 14px; border-radius:var(--radius-md); font-size:0.84rem; margin-bottom:14px;">
            <strong style="color:var(--status-countered-text);">Your Counter Sent:</strong> ₹${offer.counterPrice}/kg (Total: ₹${(offer.counterPrice * offer.quantity).toLocaleString()})
          </div>
        ` : ''}
      </div>

      <div class="entity-actions" style="flex-wrap: wrap;">
        ${isPending ? `
          <button class="btn btn-primary" style="flex:1;" onclick="handleAcceptOffer('${offer.id}')">Accept</button>
          <button class="btn btn-secondary" style="flex:1;" onclick="openCounterOfferModal(32)">Counter</button>
          <button class="btn btn-danger" onclick="handleRejectOffer('${offer.id}')">Reject</button>
        ` : `
          <button class="btn btn-secondary btn-block" disabled style="opacity:0.8;">
            Contract ${offer.status}
          </button>
        `}
      </div>
    `;
    container.appendChild(card);
  });

  if (timelineContainer && State.offers[0]) {
    const mainOffer = State.offers[0];
    let html = `<div style="display:flex; flex-direction:column; gap:12px;">`;
    mainOffer.history.forEach((h) => {
      html += `
        <div style="display:flex; gap:12px; align-items:flex-start;">
          <div style="width:10px; height:10px; border-radius:50%; background:var(--primary-green); margin-top:5px; flex-shrink:0;"></div>
          <div>
            <div style="font-size:0.88rem; font-weight:700; color:var(--text-main);">
              <span style="color:var(--primary-forest);">${h.actor}:</span> ${h.action}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${h.time}</div>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    timelineContainer.innerHTML = html;
  }
}

function handleAcceptOffer(offerId) {
  const offer = State.offers.find(o => o.id === offerId) || State.offers[0];
  offer.status = "ACCEPTED";
  offer.history.unshift({
    time: "Just now",
    actor: "Farmer (Sanjana)",
    action: `Accepted contract at ₹${offer.offerPrice}/kg. Escrow lock activated.`
  });

  const lot = State.lots.find(l => l.id === offer.lotId);
  if (lot) lot.status = "SOLD";

  State.save("offers");
  State.save("lots");

  renderOffersView();
  renderDashboardLiveState();

  addNotification({
    id: `NOTIF-${Date.now()}`,
    title: "Offer accepted",
    message: `Deal locked with ${offer.buyerName} at ₹${offer.offerPrice}/kg.`,
    time: "Just now",
    read: false,
    type: "offer"
  });

  showToast("Offer accepted! Deal confirmed.", "success");
}

function openCounterOfferModal(defaultPrice = 32) {
  const modal = document.getElementById("modal-counter-offer");
  const input = document.getElementById("counter-price-input");
  if (input) input.value = defaultPrice;
  if (modal) modal.classList.add("open");
}

function handleSendCounterSubmit(event) {
  event.preventDefault();
  const counterVal = parseFloat(document.getElementById("counter-price-input").value) || 32;
  const note = document.getElementById("counter-note").value.trim();

  const mainOffer = State.offers[0];
  if (mainOffer) {
    mainOffer.status = "COUNTERED";
    mainOffer.counterPrice = counterVal;
    mainOffer.history.unshift({
      time: "Just now",
      actor: "Farmer (Sanjana)",
      action: `Countered with ₹${counterVal}/kg. Note: "${note}"`
    });
    State.save("offers");
  }

  closeModal("modal-counter-offer");
  renderOffersView();
  renderDashboardLiveState();

  addNotification({
    id: `NOTIF-${Date.now()}`,
    title: "Counter offer sent",
    message: `Counter offer of ₹${counterVal}/kg sent to FreshFoods.`,
    time: "Just now",
    read: false,
    type: "offer"
  });

  showToast(`Counter offer of ₹${counterVal}/kg sent.`, "info");
}

function handleRejectOffer(offerId) {
  const offer = State.offers.find(o => o.id === offerId) || State.offers[0];
  offer.status = "REJECTED";
  offer.history.unshift({
    time: "Just now",
    actor: "Farmer (Sanjana)",
    action: `Rejected buyer offer of ₹${offer.offerPrice}/kg.`
  });
  State.save("offers");

  renderOffersView();
  renderDashboardLiveState();
  showToast("Offer rejected.", "error");
}

// ==========================================================================
// 14. LOGISTICS TRACKING
// ==========================================================================
const SHIPMENT_STAGES = [
  { step: 1, name: "OFFER ACCEPTED", label: "Offer Accepted" },
  { step: 2, name: "LOGISTICS REQUESTED", label: "Logistics Req." },
  { step: 3, name: "ASSIGNED", label: "Provider Assigned" },
  { step: 4, name: "PICKUP SCHEDULED", label: "Pickup Sched." },
  { step: 5, name: "PICKED UP", label: "Picked Up" },
  { step: 6, name: "IN TRANSIT", label: "In Transit" },
  { step: 7, name: "DELIVERED", label: "Delivered" }
];

function renderLogisticsView() {
  const s = State.shipment;
  document.getElementById("shipment-id-badge").innerText = s.id;
  document.getElementById("shipment-crop-title").innerText = `${s.crop} ${s.quantity} kg • ${s.buyer}`;
  document.getElementById("shipment-eta").innerText = s.eta;
  document.getElementById("shipment-status-pill").innerText = s.status;

  const nodes = document.querySelectorAll("#logistics-stepper .step-node");
  const fill = document.getElementById("stepper-fill");

  const currentIdx = s.stepIndex || 3;
  const fillPercent = Math.min(100, Math.round(((currentIdx - 1) / 6) * 100));
  if (fill) fill.style.width = `${fillPercent}%`;

  nodes.forEach((node, idx) => {
    const stepNum = idx + 1;
    node.classList.remove("completed", "current");
    const circle = node.querySelector(".step-circle");

    if (stepNum < currentIdx) {
      node.classList.add("completed");
      if (circle) circle.innerText = "✓";
    } else if (stepNum === currentIdx) {
      node.classList.add("current");
      if (circle) circle.innerText = stepNum;
    } else {
      if (circle) circle.innerText = stepNum;
    }
  });
}

function handleProgressShipment() {
  let curIndex = State.shipment.stepIndex || 3;

  if (curIndex >= 7) {
    curIndex = 3;
    State.shipment.status = "ASSIGNED";
    State.shipment.stepIndex = 3;
    showToast("Shipment reset to ASSIGNED for demo.", "info");
  } else {
    curIndex += 1;
    State.shipment.stepIndex = curIndex;
    const stage = SHIPMENT_STAGES[curIndex - 1];
    State.shipment.status = stage.name;
    showToast(`Shipment status: ${stage.name}`, "success");
  }

  State.save("shipment");
  renderLogisticsView();
  renderDashboardLiveState();

  addNotification({
    id: `NOTIF-${Date.now()}`,
    title: "Shipment update",
    message: `Shipment ${State.shipment.id} is now ${State.shipment.status}.`,
    time: "Just now",
    read: false,
    type: "logistics"
  });
}

// ==========================================================================
// 15. PAYMENTS & ESCROW
// ==========================================================================
function renderPaymentsView() {
  const p = State.payment;
  const amountEl = document.getElementById("payment-amount-display");
  const badgeEl = document.getElementById("payment-status-badge");
  const ring = document.getElementById("payment-ring");
  const ringIcon = document.getElementById("payment-ring-icon");
  const btn = document.getElementById("btn-simulate-payment");

  if (amountEl) amountEl.innerText = `₹${p.amount.toLocaleString()}`;

  if (badgeEl && ring && ringIcon) {
    ring.className = "payment-badge-ring";
    if (p.status === "COMPLETED") {
      badgeEl.className = "badge badge-green";
      badgeEl.innerText = "PAYMENT COMPLETED (SETTLED)";
      ring.classList.add("completed");
      ringIcon.innerText = "✓";
      if (btn) btn.innerText = "Reset Simulated Payment";
    } else if (p.status === "PROCESSING") {
      badgeEl.className = "badge badge-amber";
      badgeEl.innerText = "ESCROW PROCESSING...";
      ring.classList.add("pending");
      ringIcon.innerText = "⏳";
      if (btn) btn.innerText = "Processing Escrow...";
    } else {
      badgeEl.className = "badge badge-amber";
      badgeEl.innerText = "PAYMENT PENDING";
      ring.classList.add("pending");
      ringIcon.innerText = "🔒";
      if (btn) btn.innerText = "⚡ Simulate Buyer Payment";
    }
  }
}

function handleSimulatePayment() {
  if (State.payment.status === "COMPLETED") {
    State.payment.status = "PAYMENT PENDING";
    State.save("payment");
    renderPaymentsView();
    renderDashboardLiveState();
    showToast("Payment status reset to PENDING.", "info");
    return;
  }

  State.payment.status = "PROCESSING";
  State.save("payment");
  renderPaymentsView();
  renderDashboardLiveState();
  showToast("Verifying escrow release...", "info");

  setTimeout(() => {
    State.payment.status = "COMPLETED";
    State.save("payment");
    renderPaymentsView();
    renderDashboardLiveState();

    addNotification({
      id: `NOTIF-${Date.now()}`,
      title: "Payment received",
      message: "₹15,000 released to State Bank of India account •••• 8842.",
      time: "Just now",
      read: false,
      type: "payment"
    });

    showToast("Payment completed! Funds settled to bank account.", "success");
  }, 1000);
}

// ==========================================================================
// 16. NOTIFICATIONS DRAWER
// ==========================================================================
function toggleNotificationsDrawer() {
  const drawer = document.getElementById("drawer-notifications");
  if (!drawer) return;
  drawer.classList.toggle("open");
  if (drawer.classList.contains("open")) {
    renderNotificationsList();
  }
}

function renderNotificationsList() {
  const list = document.getElementById("notifications-list");
  const dot = document.getElementById("header-unread-dot");
  if (!list) return;

  const unreadCount = State.notifications.filter(n => !n.read).length;
  if (dot) dot.style.display = unreadCount > 0 ? "block" : "none";

  if (State.notifications.length === 0) {
    list.innerHTML = `<p style="text-align:center; padding:30px; color:var(--text-muted); font-size:0.85rem;">No notifications.</p>`;
    return;
  }

  list.innerHTML = "";
  State.notifications.forEach(n => {
    const item = document.createElement("div");
    item.style.padding = "14px 16px";
    item.style.marginBottom = "10px";
    item.style.borderRadius = "var(--radius-md)";
    item.style.background = n.read ? "var(--soft-green-surface)" : "#FFFFFF";
    item.style.border = `1.5px solid ${n.read ? "var(--soft-sage)" : "var(--primary-green)"}`;
    item.style.cursor = "pointer";
    item.style.boxShadow = "var(--shadow-xs)";
    item.style.transition = "all 0.15s ease";

    item.onclick = () => {
      n.read = true;
      State.save("notifications");
      renderNotificationsList();
      renderDashboardLiveState();
    };

    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <strong style="font-size:0.88rem; color:${n.read ? 'var(--text-main)' : 'var(--primary-forest)'};">${n.title}</strong>
        <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">${n.time}</span>
      </div>
      <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.4;">${n.message}</p>
    `;

    list.appendChild(item);
  });
}

function handleMarkAllNotificationsRead() {
  State.notifications.forEach(n => n.read = true);
  State.save("notifications");
  renderNotificationsList();
  renderDashboardLiveState();
  showToast("All notifications marked as read.", "info");
}

function addNotification(notif) {
  State.notifications.unshift(notif);
  State.save("notifications");
  renderNotificationsList();
}

// ==========================================================================
// 17. FLOATING AI ASSISTANT CHAT
// ==========================================================================
const PRELOADED_AI_DIALOG = [
  { sender: "user", text: "Should I sell my tomatoes today?" },
  { sender: "bot", text: "Tomato prices are moving up (+8.2%). FreshFoods is offering ₹30/kg for Lot FL-2026-0003. FarmLink suggests negotiating around ₹31–₹32/kg for optimal returns." }
];

let chatHistory = [...PRELOADED_AI_DIALOG];

function toggleAIChatDrawer() {
  const drawer = document.getElementById("drawer-ai-chat");
  if (!drawer) return;
  drawer.classList.toggle("open");
  if (drawer.classList.contains("open")) {
    renderAIChatMessages();
  }
}

function renderAIChatMessages() {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;

  container.innerHTML = "";
  chatHistory.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = `ai-chat-bubble ${msg.sender}`;
    bubble.innerText = msg.text;
    container.appendChild(bubble);
  });

  container.scrollTop = container.scrollHeight;
}

function handleQuickAIQuestion(question) {
  chatHistory.push({ sender: "user", text: question });
  renderAIChatMessages();

  setTimeout(() => {
    let reply = "FarmLink is monitoring active wholesale mandis. Local demand remains strong across Maharashtra and Tamil Nadu.";
    const qLower = question.toLowerCase();

    if (qLower.includes("sell") || qLower.includes("today")) {
      reply = "Tomato momentum is rising. FreshFoods is currently offering ₹30/kg. Consider counter-offering around ₹31–₹32/kg.";
    } else if (qLower.includes("buyer") || qLower.includes("verified")) {
      reply = "FreshFoods (98% match, 96% payment reliability) is your highest-ranked buyer with pickup from your Nashik farm.";
    } else if (qLower.includes("price") || qLower.includes("trend") || qLower.includes("tomato")) {
      reply = "Tomato modal prices are ₹28/kg in Nashik and ₹31/kg in Pune. Lower arrivals are keeping prices firm.";
    } else if (qLower.includes("shipment") || qLower.includes("track")) {
      reply = `Shipment ${State.shipment.id} is currently ${State.shipment.status} with AgriMove Logistics. ETA: ${State.shipment.eta}.`;
    }

    chatHistory.push({ sender: "bot", text: reply });
    renderAIChatMessages();
  }, 300);
}

function handleSendCustomAIMessage(event) {
  event.preventDefault();
  const input = document.getElementById("ai-chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  input.value = "";
  handleQuickAIQuestion(msg);
}

// ==========================================================================
// 18. PROFILE MANAGEMENT
// ==========================================================================
function renderProfileView() {
  const p = State.profile;
  document.getElementById("prof-name").innerText = p.name;
  document.getElementById("prof-avatar").innerText = p.name.charAt(0);
  document.getElementById("prof-location").innerText = `${p.village ? p.village + ', ' : ''}${p.district}, ${p.state}`;
  document.getElementById("prof-mobile").innerText = `+91 ${p.mobile}`;
  document.getElementById("prof-email").innerText = p.email;
  document.getElementById("prof-state").innerText = p.state;
  document.getElementById("prof-village").innerText = `${p.district}, ${p.village || 'Pimpalgaon'}`;
  document.getElementById("prof-crops").innerText = p.crops;
  document.getElementById("prof-size").innerText = `${p.farmSize} Acres`;
  document.getElementById("prof-lang").innerText = p.language === "ta" ? "தமிழ் (TA)" : "English (EN)";
}

function openEditProfileModal() {
  const p = State.profile;
  document.getElementById("edit-prof-name").value = p.name;
  document.getElementById("edit-prof-mobile").value = p.mobile;
  document.getElementById("edit-prof-crops").value = p.crops;
  document.getElementById("edit-prof-size").value = p.farmSize;
  document.getElementById("edit-prof-lang").value = p.language || "en";

  const modal = document.getElementById("modal-edit-profile");
  if (modal) modal.classList.add("open");
}

function handleSaveProfileSubmit(event) {
  event.preventDefault();
  State.profile.name = document.getElementById("edit-prof-name").value.trim();
  State.profile.mobile = document.getElementById("edit-prof-mobile").value.trim();
  State.profile.crops = document.getElementById("edit-prof-crops").value.trim();
  State.profile.farmSize = document.getElementById("edit-prof-size").value.trim();
  State.profile.language = document.getElementById("edit-prof-lang").value;

  State.save("profile");
  closeModal("modal-edit-profile");
  renderProfileView();
  renderDashboardLiveState();
  showToast("Profile updated successfully.", "success");
}

// ==========================================================================
// 19. GRIEVANCES & FPO
// ==========================================================================
function openGrievanceModal() {
  const modal = document.getElementById("modal-create-grievance");
  if (modal) modal.classList.add("open");
}

function handleCreateGrievanceSubmit(event) {
  event.preventDefault();
  const cat = document.getElementById("grv-cat").value;
  const lot = document.getElementById("grv-lot").value.trim();
  const priority = document.getElementById("grv-priority").value;
  const desc = document.getElementById("grv-desc").value.trim();

  const tbody = document.getElementById("grievance-table-body");
  if (tbody) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>GRV-2026-00${Math.floor(Math.random() * 50) + 50}</code></td>
      <td><strong>${cat}</strong></td>
      <td>${desc}</td>
      <td>${lot}</td>
      <td><span class="badge badge-amber">${priority}</span></td>
      <td><span class="badge badge-amber">IN REVIEW</span></td>
    `;
    tbody.prepend(tr);
  }

  closeModal("modal-create-grievance");
  showToast("Grievance ticket submitted.", "success");
}

function openFPOModal() {
  const modal = document.getElementById("modal-fpo");
  if (modal) modal.classList.add("open");
}

function handleFPOAggregateSubmit() {
  closeModal("modal-fpo");
  showToast("Lot FL-2026-0003 pooled with Sahyadri FPO Batch #24.", "success");
}

// ==========================================================================
// 20. SEARCH & MODAL HELPERS
// ==========================================================================
function handleGlobalSearch(event) {
  if (event.key === "Enter") {
    const query = event.target.value.toLowerCase().trim();
    if (!query) return;

    if (query.includes("lot") || query.includes("fl-")) {
      navigate("lots");
      showToast(`Showing lots for '${query}'`, "info");
    } else if (query.includes("buyer") || query.includes("freshfoods")) {
      navigate("buyers");
      showToast(`Showing buyers for '${query}'`, "info");
    } else if (query.includes("ship") || query.includes("track")) {
      navigate("logistics");
      showToast(`Tracking '${query}'`, "info");
    } else {
      navigate("market");
      showToast(`Market info for '${query}'`, "info");
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

document.querySelectorAll(".modal-overlay").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });
});

// ==========================================================================
// 21. SPLASH SCREEN CONTROLLER & INITIALIZATION
// ==========================================================================
function updateSplashMessage(text) {
  const msgEl = document.getElementById("splash-status-message");
  if (!msgEl) return;
  msgEl.classList.add("fade-switch");
  setTimeout(() => {
    msgEl.innerText = text;
    msgEl.classList.remove("fade-switch");
  }, 120);
}

function updateSplashProgress(percent) {
  const fillEl = document.getElementById("splash-progress-fill");
  const textEl = document.getElementById("splash-progress-text");
  if (fillEl) fillEl.style.width = `${percent}%`;
  if (textEl) textEl.innerText = `${percent}%`;
}

function runSplashScreenSequence(onComplete) {
  const splashEl = document.getElementById("app-splash-screen");
  if (!splashEl) {
    if (typeof onComplete === "function") onComplete();
    return;
  }

  const isReturningUser = sessionStorage.getItem("farmlink_splash_seen") === "true";
  const speedMultiplier = isReturningUser ? 0.6 : 1.0;

  const sequence = [
    { delay: 80 * speedMultiplier, progress: 20, message: "Checking today's market trends..." },
    { delay: 450 * speedMultiplier, progress: 50, message: "Finding better selling opportunities..." },
    { delay: 920 * speedMultiplier, progress: 75, message: "Connecting your farm to better buyers..." },
    { delay: 1380 * speedMultiplier, progress: 95, message: "Preparing your market insights..." },
    { delay: 1780 * speedMultiplier, progress: 100, message: "FarmLink is ready." }
  ];

  sequence.forEach(step => {
    setTimeout(() => {
      updateSplashProgress(step.progress);
      updateSplashMessage(step.message);
    }, step.delay);
  });

  const finishDelay = 2050 * speedMultiplier;
  setTimeout(() => {
    sessionStorage.setItem("farmlink_splash_seen", "true");

    if (typeof onComplete === "function") {
      onComplete();
    }

    splashEl.classList.add("fade-out");

    const activeContainer = State.isLoggedIn ? document.getElementById("app-shell") : document.getElementById("view-auth");
    if (activeContainer) {
      activeContainer.classList.add("app-entrance-fade");
    }

    setTimeout(() => {
      splashEl.classList.add("hidden");
    }, 520);
  }, finishDelay);
}

function renderAllViews() {
  renderDashboardLiveState();
  renderMarketView();
  renderLotsView();
  renderBuyersView();
  renderOffersView();
  renderLogisticsView();
  renderPaymentsView();
  renderProfileView();
  renderNotificationsList();
  renderAIChatMessages();
  applyTranslations(State.language);
}

document.addEventListener("DOMContentLoaded", () => {
  State.init();

  runSplashScreenSequence(() => {
    if (State.isLoggedIn) {
      document.getElementById("view-auth").classList.remove("active");
      document.getElementById("view-auth").style.display = "none";
      document.getElementById("app-shell").style.display = "flex";
      renderAllViews();
      navigate("dashboard");
    } else {
      document.getElementById("view-auth").style.display = "flex";
      document.getElementById("view-auth").classList.add("active");
      document.getElementById("app-shell").style.display = "none";
    }
  });
});
