import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { HarvestItem } from '@/types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  harvest: HarvestItem | null;
  onClose: () => void;
  onConfirmDelete: (harvestId: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  harvest,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !harvest) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-farm-surface w-full max-w-md rounded-3xl border border-farm-border shadow-elevated overflow-hidden select-none"
        >
          {/* Header */}
          <div className="bg-farm-surface-secondary p-5 border-b border-farm-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center shrink-0 shadow-subtle">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-farm-text">
                  Delete Harvest Listing?
                </h3>
                <p className="text-xs text-farm-text-secondary font-semibold">
                  Lot ID: {harvest.harvestCode || harvest.id}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-farm-surface border border-farm-border flex items-center justify-center text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-farm-terracotta-soft/40 border border-farm-terracotta/40 text-xs text-farm-terracotta space-y-2">
              <p className="font-bold text-sm text-farm-terracotta">
                Are you sure you want to permanently delete {harvest.cropName}?
              </p>
              <p className="font-medium text-farm-terracotta/90 leading-relaxed">
                This will remove the listing of <span className="font-bold">{harvest.quantity} {harvest.unit}</span> ({harvest.variety || 'Standard grade'}) from your inventory. This action cannot be undone.
              </p>
            </div>

            <div className="bg-farm-surface-secondary/60 p-3 rounded-xl border border-farm-border flex items-center justify-between text-xs">
              <span className="text-farm-text-secondary font-semibold">Current Status:</span>
              <span className="font-bold px-2 py-0.5 rounded-md bg-farm-surface text-farm-text border border-farm-border">
                {harvest.status}
              </span>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="bg-farm-surface-secondary p-5 border-t border-farm-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmDelete(harvest.id);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-farm-terracotta text-white text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-subtle"
            >
              <Trash2 className="w-4 h-4 text-white" />
              <span>Delete Harvest</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
