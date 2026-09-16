import { useState } from 'react';
import { HelpCircle, X, Send, ChevronDown, ChevronUp, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';
import { SUPPORT_FAQS } from '@/data/profileData';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [category, setCategory] = useState('Harvest Listing');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-2xl shadow-card overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-farm-gold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Help & Farmer Support
              </h2>
              <p className="text-xs text-white/70 font-medium">
                Guides, FAQs, and marketplace assistance
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Help Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-farm-text-secondary font-bold uppercase">Kisan Mandi Helpline</p>
                <p className="text-sm font-bold text-farm-text font-mono">1800-425-8899</p>
                <p className="text-[10px] text-farm-text-secondary">Mon - Sat: 6:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-farm-text-secondary font-bold uppercase">Support Email</p>
                <p className="text-sm font-bold text-farm-text font-mono">support@farmlink.in</p>
                <p className="text-[10px] text-farm-text-secondary">Response within 2 hours</p>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-farm-brand flex items-center gap-2">
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-2">
              {SUPPORT_FAQS.map((faq) => {
                const isExpanded = activeFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-farm-border rounded-2xl bg-farm-surface overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaqId(isExpanded ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-farm-surface-secondary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-farm-brand-soft text-farm-brand px-2 py-0.5 rounded-md border border-farm-border">
                          {faq.category}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-farm-text">
                          {faq.question}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-farm-brand shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-farm-text-secondary shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-0 text-xs text-farm-text/80 leading-relaxed border-t border-farm-border/50 bg-farm-surface">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="p-5 rounded-3xl bg-farm-surface-secondary border border-farm-border space-y-4">
            <h3 className="font-display font-bold text-base text-farm-brand">
              Send Support Inquiry
            </h3>

            {isSubmitted ? (
              <div className="p-5 bg-farm-surface rounded-2xl border border-farm-brand text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-farm-brand-soft text-farm-brand mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-farm-brand" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-farm-text">
                    Support Ticket Registered (Demo Mode)
                  </h4>
                  <p className="text-xs text-farm-text-secondary mt-1 max-w-sm mx-auto">
                    Your inquiry regarding <span className="font-bold text-farm-text">"{category}"</span> has been logged for prototype testing. Our field support team will follow up via your registered phone number.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-farm-text mb-1">
                      Issue Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand cursor-pointer"
                    >
                      <option value="Harvest Listing">Harvest Listing</option>
                      <option value="Buyer Discovery">Buyer Discovery</option>
                      <option value="Orders & Delivery">Orders & Delivery</option>
                      <option value="Escrow Payments">Escrow Payments</option>
                      <option value="Account & Profile">Account & Profile</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-farm-text mb-1">
                      Subject / Lot Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Question on FL-2026-001"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Describe your issue <span className="text-farm-danger">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-[11px] text-farm-text-secondary">
                    Demo inquiries are processed locally.
                  </p>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover flex items-center gap-2 cursor-pointer shadow-subtle border border-farm-brand"
                  >
                    <Send className="w-3.5 h-3.5 text-farm-gold" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
