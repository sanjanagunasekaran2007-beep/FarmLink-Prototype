import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Calendar, ShieldCheck, Mail, Phone, Tag, CheckCircle2, AlertCircle, Ban } from 'lucide-react';
import { AdminUserItem } from '@/types';

interface AdminUserDetailModalProps {
  user: AdminUserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (userId: string, newStatus: 'Active' | 'Pending Review' | 'Inactive') => void;
}

export const AdminUserDetailModal = ({
  user,
  isOpen,
  onClose,
  onStatusChange,
}: AdminUserDetailModalProps) => {
  if (!isOpen || !user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Farmer':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
      case 'Buyer':
        return { bg: '#F1D8C8', text: '#8A4A28', border: '#B86B45' };
      case 'Logistics':
        return { bg: '#DDE8F0', text: '#2A5570', border: '#4A7C9D' };
      default:
        return { bg: '#F7F4EC', text: '#17211C', border: '#DCE2D9' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: '#E8EFE5', text: '#164A36', border: '#3F7453' };
      case 'Pending Review':
        return { bg: '#FFF3D6', text: '#8A6812', border: '#D9A441' };
      case 'Inactive':
        return { bg: '#FDEAE8', text: '#B94A48', border: '#B94A48' };
      default:
        return { bg: '#F7F4EC', text: '#17211C', border: '#DCE2D9' };
    }
  };

  const roleStyle = getRoleColor(user.role);
  const statusStyle = getStatusColor(user.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl bg-farm-surface rounded-2xl border border-farm-border shadow-subtle overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white px-6 py-4 flex items-center justify-between border-b border-farm-brand">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-farm-brand flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  User Profile Details
                </h3>
                <div className="flex items-center gap-2 text-xs text-farm-text-secondary/80">
                  <span>ID: {user.userId}</span>
                  <span>&bull;</span>
                  <span className="text-farm-gold font-semibold">Demo Record</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-farm-brand text-farm-text-secondary hover:bg-farm-brand transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* User Title & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-farm-border">
              <div>
                <h4 className="text-xl font-display font-bold text-farm-text">
                  {user.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-farm-text-secondary mt-1">
                  <MapPin className="w-3.5 h-3.5 text-farm-brand" />
                  <span>{user.district}, {user.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold border"
                  style={{
                    backgroundColor: roleStyle.bg,
                    color: roleStyle.text,
                    borderColor: roleStyle.border,
                  }}
                >
                  {user.role}
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold border"
                  style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                    borderColor: statusStyle.border,
                  }}
                >
                  {user.status}
                </span>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary">
                  <Calendar className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Member Since</span>
                </div>
                <p className="text-sm font-semibold text-farm-text">{user.joinedDate}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary">
                  <Tag className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Trade Activity</span>
                </div>
                <p className="text-sm font-semibold text-farm-text">
                  {user.totalListingsOrOrders} {user.role === 'Farmer' ? 'Listings Published' : user.role === 'Buyer' ? 'Orders Placed' : 'Trips Handled'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary">
                  <Phone className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Masked Phone (Demo)</span>
                </div>
                <p className="text-sm font-mono font-medium text-farm-text">{user.phoneDemo}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary">
                  <Mail className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Contact Email (Demo)</span>
                </div>
                <p className="text-sm font-mono text-farm-text truncate">{user.emailDemo}</p>
              </div>
            </div>

            {/* Verification Status */}
            <div className="p-4 rounded-xl bg-farm-brand-soft border border-farm-brand/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-farm-brand text-white flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-farm-brand uppercase tracking-wider">
                    Verification Ledger
                  </h5>
                  <p className="text-sm font-bold text-farm-text mt-0.5">
                    {user.verificationBadge}
                  </p>
                  <p className="text-xs text-farm-text-secondary mt-1">
                    Non-sensitive mock credentials verified via simulated APMC / FSSAI registry.
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            {user.notes && (
              <div className="p-4 rounded-xl bg-farm-surface border border-farm-gold">
                <h5 className="text-xs font-bold text-farm-text-secondary uppercase tracking-wider mb-1">
                  Demonstration Notes
                </h5>
                <p className="text-xs text-farm-text leading-relaxed">
                  {user.notes}
                </p>
              </div>
            )}

            {/* Safe Demo Status Actions */}
            {onStatusChange && (
              <div className="pt-2 border-t border-farm-border">
                <p className="text-xs font-bold text-farm-text mb-2">
                  Demo Account Status Actions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.status !== 'Active' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(user.id, 'Active')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Set as Active</span>
                    </button>
                  )}
                  {user.status !== 'Pending Review' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(user.id, 'Pending Review')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-farm-gold text-farm-text text-xs font-bold hover:bg-farm-terracotta transition-colors cursor-pointer"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Flag for Review</span>
                    </button>
                  )}
                  {user.status !== 'Inactive' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(user.id, 'Inactive')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-farm-danger text-white text-xs font-bold hover:bg-farm-surface-secondary transition-colors cursor-pointer"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Set as Inactive</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-farm-text-secondary mt-2">
                  * Note: Status changes only affect this demonstration session.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-farm-surface px-6 py-3.5 border-t border-farm-border flex items-center justify-between">
            <span className="text-xs text-farm-text-secondary">
              FarmLink Admin Demonstration Module
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
