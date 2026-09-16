import { motion } from 'framer-motion';
import { 
  Sprout, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  Package,
  Layers,
  MapPin,
  Sparkles
} from 'lucide-react';
import { RoleType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';

interface RoleSelectionProps {
  selectedRole: RoleType | null;
  onSelectRole: (role: RoleType) => void;
  onOpenAdmin?: () => void;
}

export const RoleSelection = ({
  selectedRole,
  onSelectRole,
  onOpenAdmin,
}: RoleSelectionProps) => {
  const { t } = useLanguage();
  const { settings } = useAccessibility();
  const isReducedMotion = settings.reducedMotion;

  const rolePanels = [
    {
      id: 'farmer' as RoleType,
      name: t('roles.farmer', 'Farmer'),
      category: 'Producers & Growers',
      description: t('roles.farmerDescription', 'List your harvest and connect with buyers.'),
      accentClass: 'text-farm-terracotta',
      btnClass: 'bg-farm-terracotta hover:opacity-90',
      surfaceClass: 'bg-farm-terracotta-soft',
      iconBgClass: 'bg-farm-terracotta text-white',
      badgeClass: 'bg-farm-surface-muted text-farm-terracotta border-farm-border',
      icon: <Sprout className="w-7 h-7 text-farm-terracotta" />,
      conceptLabel: 'Harvest & Farmgate',
      perks: [
        { label: 'Add and manage harvest listings', icon: <Package className="w-3.5 h-3.5" /> },
        { label: 'Live regional APMC market prices', icon: <TrendingUp className="w-3.5 h-3.5" /> },
        { label: 'Direct institutional buyer network', icon: <Check className="w-3.5 h-3.5" /> },
      ],
      badge: 'Escrow Secured',
    },
    {
      id: 'buyer' as RoleType,
      name: t('roles.buyer', 'Buyer'),
      category: 'Wholesale & Retailers',
      description: t('roles.buyerDescription', 'Discover fresh produce from trusted sources.'),
      accentClass: 'text-farm-teal',
      btnClass: 'bg-farm-teal hover:opacity-90',
      surfaceClass: 'bg-farm-teal-soft',
      iconBgClass: 'bg-farm-teal text-white',
      badgeClass: 'bg-farm-surface-muted text-farm-teal border-farm-border',
      icon: <ShoppingBag className="w-7 h-7 text-farm-teal" />,
      conceptLabel: 'Catalog & Procurement',
      perks: [
        { label: 'Direct farmgate batch catalog', icon: <Package className="w-3.5 h-3.5" /> },
        { label: 'Standardized quality grade specs', icon: <Check className="w-3.5 h-3.5" /> },
        { label: 'Single-click express procurement', icon: <TrendingUp className="w-3.5 h-3.5" /> },
      ],
      badge: 'Quality Graded',
    },
    {
      id: 'logistics' as RoleType,
      name: t('roles.logistics', 'Logistics'),
      category: 'Transporters & Fleets',
      description: t('roles.logisticsDescription', 'Manage pickups and move produce efficiently.'),
      accentClass: 'text-farm-brown',
      btnClass: 'bg-farm-brown hover:opacity-90',
      surfaceClass: 'bg-farm-brown-soft',
      iconBgClass: 'bg-farm-brown text-white',
      badgeClass: 'bg-farm-surface-muted text-farm-brown border-farm-border',
      icon: <Truck className="w-7 h-7 text-farm-brown" />,
      conceptLabel: 'Routes & Consignments',
      perks: [
        { label: 'Optimized farmgate load pooling', icon: <MapPin className="w-3.5 h-3.5" /> },
        { label: 'Reefer and bulk freight scheduling', icon: <Layers className="w-3.5 h-3.5" /> },
        { label: 'Instant digital Proof of Delivery', icon: <Check className="w-3.5 h-3.5" /> },
      ],
      badge: 'Verified Fleet',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 select-none">
      {/* 1. CENTRAL IDENTITY & WELCOME HERO */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <motion.div
          initial={isReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-3"
        >
          {/* Trust Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 px-3 py-1.5 rounded-full bg-farm-surface border border-farm-border shadow-subtle text-[11px] xs:text-xs font-bold text-farm-brand max-w-full text-center">
            <span className="w-2 h-2 rounded-full bg-farm-brand shrink-0"></span>
            <span className="whitespace-nowrap">{t('common.mandiNetwork', 'Live Mandi Trade Network')}</span>
            <span className="text-farm-border hidden xs:inline">•</span>
            <span className="text-farm-text-secondary font-medium">Tamil Nadu &bull; Karnataka &bull; Maharashtra</span>
          </div>

          {/* Main Headings */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-farm-text tracking-tight">
            {t('roles.welcomeToFarmLink', 'Welcome to FarmLink')}
          </h1>

          <p className="text-sm sm:text-base text-farm-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            {t('roles.chooseRoleDesc', 'Choose how you want to connect with the agricultural marketplace.')}
          </p>
        </motion.div>
      </div>

      {/* 2. THREE ROLE ZONES / INTERACTIVE PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {rolePanels.map((panel, idx) => {
          const isSelected = selectedRole === panel.id;

          return (
            <motion.div
              key={panel.id}
              initial={isReducedMotion ? undefined : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: isReducedMotion ? 0 : idx * 0.08,
                ease: 'easeOut',
              }}
              whileHover={isReducedMotion ? undefined : { y: -4 }}
              className={`rounded-3xl border border-farm-border transition-all flex flex-col justify-between overflow-hidden shadow-card bg-farm-surface relative ${
                isSelected ? 'ring-2 ring-farm-brand' : ''
              }`}
            >
              {/* Role Header Strip (Solid Colour Accent) */}
              <div className={`p-6 sm:p-7 border-b border-farm-border ${panel.surfaceClass}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  {/* Icon Emblem */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-farm-surface border border-farm-border shadow-subtle">
                    {panel.icon}
                  </div>

                  {/* Role Type Chip */}
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${panel.badgeClass}`}>
                    {panel.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${panel.accentClass}`}>
                      {panel.name}
                    </h2>
                  </div>
                  <p className="text-xs font-bold text-farm-text-secondary uppercase tracking-wider">
                    {panel.category}
                  </p>
                </div>

                {/* Primary Role Description */}
                <p className="text-sm font-semibold text-farm-text mt-3 leading-snug">
                  {panel.description}
                </p>
              </div>

              {/* Body: Key Capabilities & Benefits */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-farm-surface">
                <div className="space-y-3 mb-6">
                  <span className="text-[11px] font-bold text-farm-text-muted uppercase tracking-wider block">
                    Core Capabilities:
                  </span>
                  {panel.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-farm-text font-medium">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${panel.iconBgClass}`}>
                        {perk.icon}
                      </div>
                      <span className="leading-snug pt-0.5">{perk.label}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => onSelectRole(panel.id)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold text-white active:scale-98 transition-all flex items-center justify-center gap-2 shadow-subtle cursor-pointer ${panel.btnClass}`}
                  id={`select-role-${panel.id}`}
                >
                  <span>Connect as {panel.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. DEMO ADMIN WORKSPACE FOOTER LAUNCHER */}
      {onOpenAdmin && (
        <div className="mt-8 pt-6 border-t border-farm-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-farm-surface p-4 sm:p-5 rounded-3xl border border-farm-border shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-surface-muted text-farm-gold flex items-center justify-center shrink-0 border border-farm-border shadow-subtle">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h3 className="text-xs font-bold text-farm-text">
                  Platform Governance & Demonstration Workspace
                </h3>
                <span className="text-[10px] font-bold text-farm-gold bg-farm-surface-muted px-2 py-0.5 rounded-full border border-farm-border">
                  Admin Demo
                </span>
              </div>
              <p className="text-[11px] text-farm-text-secondary mt-0.5">
                Inspect marketplace metrics, user directories, harvest moderation, and escrow settlement ledgers.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all cursor-pointer shrink-0 shadow-subtle flex items-center justify-center gap-2"
            id="open-admin-workspace-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-farm-gold" />
            <span>Open Admin Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
