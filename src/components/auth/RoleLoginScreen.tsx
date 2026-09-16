import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, 
  ShoppingBag, 
  Truck, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Lock, 
  Phone, 
  User, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Check,
  ShieldCheck,
  Package,
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';
import { RoleType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

interface RoleLoginScreenProps {
  role: RoleType;
  onBack: () => void;
  onReplayIntro: () => void;
  onLoginSuccess: (role: RoleType) => void;
}

export const RoleLoginScreen = ({
  role,
  onBack,
  onLoginSuccess,
}: RoleLoginScreenProps) => {
  const { t } = useLanguage();
  const { settings } = useAccessibility();
  const isReducedMotion = settings.reducedMotion;

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Login Form State
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Feedback & State
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');

  // Registration Form State
  const [regFullName, setRegFullName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regState, setRegState] = useState('Tamil Nadu');
  const [regDistrict, setRegDistrict] = useState('Dindigul');
  const [regCustomDetail, setRegCustomDetail] = useState('Tomato');

  // Role Configurations according to specification
  const getRoleConfig = () => {
    switch (role) {
      case 'farmer':
        return {
          title: t('roles.farmer', 'Farmer'),
          heading: 'Welcome back, Farmer',
          supportingText: 'Bring your harvest closer to the right market.',
          badge: 'Farmer Portal',
          accentClass: 'text-farm-terracotta',
          bgClass: 'bg-farm-terracotta',
          surfaceClass: 'bg-farm-terracotta-soft',
          icon: <Sprout className="w-6 h-6 text-farm-terracotta" />,
          benefits: [
            { text: 'Add and manage harvest listings', icon: <Package className="w-3.5 h-3.5" /> },
            { text: 'View current market prices', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { text: 'Connect with buyers', icon: <Check className="w-3.5 h-3.5" /> },
          ],
          quote: '“FarmLink helps me discover verified buyers with direct farmgate pickup.”',
          author: '— Murugan K., Dindigul District',
          itemLabel: 'Primary Crop Grown',
          options: ['Tomato', 'Onion', 'Wheat', 'Cotton', 'Potato', 'Rice', 'Chili', 'Banana'],
        };
      case 'buyer':
        return {
          title: t('roles.buyer', 'Buyer'),
          heading: 'Welcome back, Buyer',
          supportingText: 'Find fresh produce from reliable sources.',
          badge: 'Buyer Marketplace',
          accentClass: 'text-farm-teal',
          bgClass: 'bg-farm-teal',
          surfaceClass: 'bg-farm-teal-soft',
          icon: <ShoppingBag className="w-6 h-6 text-farm-teal" />,
          benefits: [
            { text: 'Discover available harvests', icon: <Package className="w-3.5 h-3.5" /> },
            { text: 'View crop and quantity details', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { text: 'Track your purchase requests', icon: <Check className="w-3.5 h-3.5" /> },
          ],
          quote: '“Direct farm origin transparency, verified quality grading, and guaranteed fulfillment.”',
          author: '— Rajesh Patel, FreshMart Wholesale',
          itemLabel: 'Procurement Category',
          options: ['Vegetables & Greens', 'Fresh Fruits', 'Grains & Pulses', 'Spices & Condiments', 'Certified Organic Produce'],
        };
      case 'logistics':
        return {
          title: t('roles.logistics', 'Logistics Partner'),
          heading: 'Welcome back, Logistics Partner',
          supportingText: 'Keep every farm delivery moving smoothly.',
          badge: 'Logistics Fleet',
          accentClass: 'text-farm-brown',
          bgClass: 'bg-farm-brown',
          surfaceClass: 'bg-farm-brown-soft',
          icon: <Truck className="w-6 h-6 text-farm-brown" />,
          benefits: [
            { text: 'View assigned deliveries', icon: <Package className="w-3.5 h-3.5" /> },
            { text: 'Track delivery progress', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { text: 'Update pickup and delivery status', icon: <Check className="w-3.5 h-3.5" /> },
          ],
          quote: '“Clear route milestones, zero empty runs, and instantaneous digital proof of delivery.”',
          author: '— Harpreet Singh, Kisan Roadways',
          itemLabel: 'Vehicle Fleet Type',
          options: ['Small Commercial Vehicle (Pickup/Ace)', 'Medium Duty Truck (6-10 Ton)', 'Reefer / Cold-Chain Van', 'Heavy Agri Trailer'],
        };
      case 'admin':
      default:
        return {
          title: 'Admin',
          heading: 'Platform Administration',
          supportingText: 'Demonstration and governance portal.',
          badge: 'Admin Workspace',
          accentClass: 'text-farm-gold',
          bgClass: 'bg-farm-brand',
          surfaceClass: 'bg-farm-surface-muted',
          icon: <ShieldCheck className="w-6 h-6 text-farm-gold" />,
          benefits: [
            { text: 'Inspect simulated APMC spot feeds', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { text: 'Moderate user accounts & harvest listings', icon: <Check className="w-3.5 h-3.5" /> },
            { text: 'View escrow settlements & order corridors', icon: <Package className="w-3.5 h-3.5" /> },
          ],
          quote: '“Real-time visibility across agricultural supply corridors.”',
          author: '— Platform Operations Lead',
          itemLabel: 'Governance Area',
          options: ['Marketplace Operations', 'Quality Review', 'Fleet Logistics', 'Financial Audit'],
        };
    }
  };

  const config = getRoleConfig();

  // 1-Click Demo Auto-Fill
  const handleAutoFill = () => {
    setIdentity('9876543210');
    setPassword('123456');
    setErrorMsg(null);
    setSuccessMsg('Demo credentials filled: 9876543210 / 123456');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 1-Click Instant Demo Access
  const handleQuickDemoAccess = () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(role);
    }, 280);
  };

  // Form Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = identity.trim();
    if (!trimmed) {
      setErrorMsg('Please enter your registered mobile number or email.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(role);
    }, 320);
  };

  // Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regFullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!regMobile.trim() || regMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Account registered for ${regFullName} (${config.title}). You can now sign in.`);
      setIdentity(regMobile);
      setAuthMode('login');
    }, 450);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForgotModal(false);
    setSuccessMsg(`Password reset link dispatched to ${forgotInput || 'registered contact'}.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 select-none">
      {/* 1. TOP CONTEXT BAR */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-text bg-farm-surface border border-farm-border px-3.5 py-2 rounded-xl shadow-subtle hover:bg-farm-surface-hover active:scale-95 transition-all cursor-pointer"
          id="back-to-roles-button"
        >
          <ArrowLeft className="w-4 h-4 text-farm-text" />
          <span>← Change role</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-farm-text-muted hidden sm:inline">
            Step 2 of 2 — Sign in
          </span>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-farm-border shadow-subtle ${config.surfaceClass} ${config.accentClass}`}
          >
            {config.icon}
            <span>{config.badge}</span>
          </div>
        </div>
      </div>

      {/* 2. POLISHED SPLIT-SCREEN CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-farm-border bg-farm-surface shadow-elevated overflow-hidden">
        {/* =========================================================================
            LEFT/PRIMARY VISUAL AREA: SOLID COLOUR ROLE PANEL & BENEFITS
            ========================================================================= */}
        <div
          className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-farm-border ${config.surfaceClass}`}
        >
          <div>
            {/* Emblem & Role Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-farm-surface border border-farm-border shadow-subtle"
              >
                {config.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-farm-text-muted">
                  FarmLink Network
                </span>
                <h3
                  className={`text-xl sm:text-2xl font-display font-bold leading-tight ${config.accentClass}`}
                >
                  {config.badge}
                </h3>
              </div>
            </div>

            {/* Supporting Header Message */}
            <div className="mb-6 space-y-1">
              <h4
                className={`text-lg sm:text-xl font-display font-bold leading-snug ${config.accentClass}`}
              >
                {config.heading}
              </h4>
              <p className="text-xs sm:text-sm font-medium text-farm-text leading-relaxed">
                {config.supportingText}
              </p>
            </div>

            {/* Benefit Points (Mandated In Spec) */}
            <div className="space-y-3 mb-6 p-4 bg-farm-surface rounded-2xl border border-farm-border shadow-subtle">
              <span className="text-[11px] font-bold uppercase tracking-wider block text-farm-text-muted">
                Key Capabilities:
              </span>
              {config.benefits.map((b, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2.5 text-xs font-semibold text-farm-text">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 ${config.bgClass}`}
                  >
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="leading-snug">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border mt-2">
            <p className="text-xs italic text-farm-text leading-relaxed mb-1">
              {config.quote}
            </p>
            <p
              className={`text-[11px] font-bold ${config.accentClass}`}
            >
              {config.author}
            </p>
          </div>
        </div>

        {/* =========================================================================
            RIGHT/FORM AREA: REFINED LOGIN & AUTHENTICATION
            ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-farm-surface">
          {/* Form Header */}
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2
                className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${config.accentClass}`}
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-farm-text-secondary mt-0.5">
                Access your personalized {config.title} workspace.
              </p>
            </div>

            {/* Demo Access Notice Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-farm-surface-muted text-farm-gold border border-farm-border text-[10px] font-bold self-start sm:self-auto">
              <Info className="w-3 h-3 text-farm-gold" />
              <span>Demo access — no real account is created.</span>
            </span>
          </div>

          {/* Tab Switcher (Sign In / Register) */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-farm-surface-muted rounded-2xl border border-farm-border mb-4">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMsg(null);
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'login'
                  ? `bg-farm-surface shadow-subtle border border-farm-border ${config.accentClass}`
                  : 'text-farm-text-secondary hover:text-farm-text'
              }`}
              id="tab-login-btn"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMsg(null);
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'register'
                  ? `bg-farm-surface shadow-subtle border border-farm-border ${config.accentClass}`
                  : 'text-farm-text-secondary hover:text-farm-text'
              }`}
              id="tab-register-btn"
            >
              Create Account
            </button>
          </div>

          {/* Inline Feedback / Alert */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-farm-danger-soft border border-farm-danger text-farm-danger text-xs font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-4 p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${config.surfaceClass} ${config.accentClass}`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. SIGN IN FORM */}
          {authMode === 'login' && (
            <div>
              {/* 1-Click Demo Auto-Fill Box */}
              <div className="p-3 rounded-xl bg-farm-surface-muted border border-farm-border flex items-center justify-between mb-4">
                <div>
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider ${config.accentClass}`}
                  >
                    Demo Login Credentials
                  </div>
                  <div className="text-xs text-farm-text font-mono font-bold mt-0.5">
                    9876543210 &bull; 123456
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className={`px-3 py-1.5 rounded-lg bg-farm-surface border border-farm-border text-xs font-bold hover:bg-farm-surface-hover active:scale-95 transition-all shadow-subtle cursor-pointer ${config.accentClass}`}
                  id="autofill-btn"
                >
                  Auto Fill
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Mobile / Email Input */}
                <div>
                  <label
                    className="block text-xs font-bold text-farm-text mb-1.5"
                    htmlFor="login-identity-input"
                  >
                    Mobile Number or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-muted">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="login-identity-input"
                      type="text"
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                      placeholder="Enter 9876543210 or email"
                      required
                      className="w-full pl-10 pr-3.5 py-3 bg-farm-surface border border-farm-border rounded-xl text-sm text-farm-text placeholder-farm-text-muted focus:outline-none focus:ring-2 focus:ring-farm-brand/30 transition-all"
                    />
                  </div>
                </div>

                {/* Password Input with Visibility Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="text-xs font-bold text-farm-text"
                      htmlFor="login-password-input"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className={`text-xs font-bold hover:underline cursor-pointer ${config.accentClass}`}
                      id="forgot-password-link"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-muted">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (123456)"
                      required
                      className="w-full pl-10 pr-11 py-3 bg-farm-surface border border-farm-border rounded-xl text-sm text-farm-text placeholder-farm-text-muted focus:outline-none focus:ring-2 focus:ring-farm-brand/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-farm-text-muted hover:text-farm-text transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      id="toggle-password-visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs font-medium text-farm-text-secondary cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-farm-border text-farm-brand focus:ring-farm-brand w-4 h-4 cursor-pointer"
                      id="remember-me-checkbox"
                    />
                    <span>Remember me on this device</span>
                  </label>
                </div>

                {/* Primary Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 px-4 rounded-xl text-white text-sm font-bold active:scale-98 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer ${config.bgClass} hover:opacity-90`}
                    id="login-submit-button"
                  >
                    <span>Log In as {config.title}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickDemoAccess}
                    className="w-full py-3 px-4 rounded-xl bg-farm-surface-muted border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-surface-hover active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-subtle cursor-pointer"
                    id="instant-demo-button"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-farm-gold" />
                    <span>⚡ Instant Demo Access</span>
                  </button>
                </div>

                {/* Switch to Register */}
                <div className="text-center pt-3 border-t border-farm-border">
                  <p className="text-xs text-farm-text-secondary">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setErrorMsg(null);
                      }}
                      className={`font-bold hover:underline cursor-pointer ${config.accentClass}`}
                      id="switch-to-register-btn"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* 4. DEMO REGISTRATION FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-farm-text-muted" />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="e.g. Sanjana Devi"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text placeholder-farm-text-muted focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-farm-text-muted" />
                    <input
                      type="tel"
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      placeholder="10-digit mobile"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text placeholder-farm-text-muted focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text placeholder-farm-text-muted focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    State
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-farm-text-muted" />
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none"
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    District / Region
                  </label>
                  <input
                    type="text"
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    placeholder="e.g. Dindigul / Nashik"
                    required
                    className="w-full px-3 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text placeholder-farm-text-muted focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1">
                  {config.itemLabel}
                </label>
                <select
                  value={regCustomDetail}
                  onChange={(e) => setRegCustomDetail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none"
                >
                  {config.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-4 rounded-xl text-white text-sm font-bold active:scale-98 transition-all shadow-subtle cursor-pointer ${config.bgClass} hover:opacity-90`}
                  id="register-submit-button"
                >
                  Register as {config.title}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-farm-text-secondary">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMsg(null);
                    }}
                    className={`font-bold hover:underline cursor-pointer ${config.accentClass}`}
                  >
                    Sign In here
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex items-center justify-center p-4 select-none"
          >
            <motion.div
              initial={isReducedMotion ? undefined : { scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={isReducedMotion ? undefined : { scale: 0.95, y: 10 }}
              className="w-full max-w-sm bg-farm-surface rounded-3xl border border-farm-border p-6 shadow-elevated"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-subtle ${config.bgClass}`}
                >
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-farm-text">
                    Reset Password
                  </h4>
                  <p className="text-xs text-farm-text-muted">
                    {config.title} Account Recovery
                  </p>
                </div>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <p className="text-xs text-farm-text-secondary leading-relaxed">
                  Enter your registered mobile number or email address to receive a secure demo password reset link.
                </p>

                <input
                  type="text"
                  value={forgotInput}
                  onChange={(e) => setForgotInput(e.target.value)}
                  placeholder="Enter mobile or email"
                  required
                  className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none"
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3.5 py-2 rounded-xl border border-farm-border text-xs font-bold text-farm-text-muted hover:bg-farm-surface-hover cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-subtle cursor-pointer ${config.bgClass} hover:opacity-90`}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
