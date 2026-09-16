import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RoleType } from '@/types';
import { 
  Sprout, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  ArrowLeft, 
  Package, 
  MapPin, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';

interface RoleTransitionProps {
  role: RoleType;
  onContinueToLogin: () => void;
  onBack: () => void;
}

export const RoleTransition = ({
  role,
  onContinueToLogin,
  onBack,
}: RoleTransitionProps) => {
  const { settings } = useAccessibility();
  const { t } = useLanguage();
  const isReducedMotion = settings.reducedMotion;

  useEffect(() => {
    // Smooth, quick advance to the login screen
    const delay = isReducedMotion ? 400 : 950;
    const timer = setTimeout(() => {
      onContinueToLogin();
    }, delay);

    return () => clearTimeout(timer);
  }, [onContinueToLogin, isReducedMotion]);

  const getRoleConfig = () => {
    switch (role) {
      case 'farmer':
        return {
          title: t('roles.farmer', 'Farmer'),
          category: 'Producers & Growers',
          accentClass: 'text-farm-terracotta',
          bgClass: 'bg-farm-terracotta',
          surfaceClass: 'bg-farm-terracotta-soft',
          message: 'Connecting to live APMC spot rates & harvest listings...',
          icon: <Sprout className="w-8 h-8 text-farm-terracotta" />,
          detailIcon: <Package className="w-4 h-4 text-farm-terracotta" />,
          detailText: 'Preparing Farmgate Listing Desk',
        };
      case 'buyer':
        return {
          title: t('roles.buyer', 'Buyer'),
          category: 'Wholesale & Retailers',
          accentClass: 'text-farm-teal',
          bgClass: 'bg-farm-teal',
          surfaceClass: 'bg-farm-teal-soft',
          message: 'Accessing verified farm clusters & direct procurement catalog...',
          icon: <ShoppingBag className="w-8 h-8 text-farm-teal" />,
          detailIcon: <CheckCircle2 className="w-4 h-4 text-farm-teal" />,
          detailText: 'Loading Verified Produce Batches',
        };
      case 'logistics':
        return {
          title: t('roles.logistics', 'Logistics Partner'),
          category: 'Transporters & Fleets',
          accentClass: 'text-farm-brown',
          bgClass: 'bg-farm-brown',
          surfaceClass: 'bg-farm-brown-soft',
          message: 'Accessing active farm-to-mandi freight corridors & fleet dispatch...',
          icon: <Truck className="w-8 h-8 text-farm-brown" />,
          detailIcon: <MapPin className="w-4 h-4 text-farm-brown" />,
          detailText: 'Syncing Highway Freight Routes',
        };
      case 'admin':
      default:
        return {
          title: 'Admin Workspace',
          category: 'Platform Operations',
          accentClass: 'text-farm-gold',
          bgClass: 'bg-farm-brand',
          surfaceClass: 'bg-farm-surface-muted',
          message: 'Loading platform administration ledger & verification queue...',
          icon: <ShieldCheck className="w-8 h-8 text-farm-gold" />,
          detailIcon: <ShieldCheck className="w-4 h-4 text-farm-gold" />,
          detailText: 'Initializing Platform Simulation Ledger',
        };
    }
  };

  const config = getRoleConfig();

  return (
    <motion.div
      initial={isReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={isReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-md mx-auto bg-farm-surface rounded-3xl border border-farm-border p-7 sm:p-8 shadow-elevated text-center select-none"
    >
      {/* Role Visual Icon Container */}
      <div className="relative w-20 h-20 mx-auto mb-5">
        <motion.div
          animate={isReducedMotion ? undefined : { scale: [0.96, 1.04, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-20 h-20 rounded-3xl flex items-center justify-center border border-farm-border shadow-subtle ${config.surfaceClass}`}
        >
          {config.icon}
        </motion.div>

        {/* Floating Mini Icon for Role-Specific Interaction */}
        {!isReducedMotion && (
          <motion.div
            initial={{ scale: 0, x: 10, y: 10 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-farm-surface border border-farm-border shadow-subtle flex items-center justify-center"
          >
            {config.detailIcon}
          </motion.div>
        )}
      </div>

      {/* Role Title & Status */}
      <div className="space-y-1.5 mb-5">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-farm-border ${config.surfaceClass} ${config.accentClass}`}
        >
          {config.detailText}
        </span>

        <h3
          className={`text-2xl sm:text-3xl font-display font-bold ${config.accentClass}`}
        >
          {config.title}
        </h3>

        <p className="text-xs sm:text-sm font-medium text-farm-text-secondary max-w-xs mx-auto leading-relaxed">
          {config.message}
        </p>
      </div>

      {/* Solid Indicator Bar */}
      <div className="w-full h-1.5 rounded-full bg-farm-surface-muted border border-farm-border overflow-hidden mb-6">
        <motion.div
          className={`h-full rounded-full ${config.bgClass}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: isReducedMotion ? 0.3 : 0.9, ease: 'easeInOut' }}
        />
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onContinueToLogin}
          className={`w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold text-white active:scale-98 transition-all inline-flex items-center justify-center gap-2 shadow-subtle cursor-pointer ${config.bgClass} hover:opacity-90`}
          id="proceed-to-login-btn"
        >
          <span>Continue to {config.title.split(' ')[0]} Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 px-4 rounded-xl text-xs font-bold text-farm-text-muted hover:text-farm-text hover:bg-farm-surface-hover transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
          id="role-transition-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Role</span>
        </button>
      </div>
    </motion.div>
  );
};
