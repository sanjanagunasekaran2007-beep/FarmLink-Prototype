import { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  RotateCcw
} from 'lucide-react';
import { 
  SupportRequestItem, 
  SupportCategory, 
  RoleType 
} from '@/types';
import { ALL_FAQS, POPULAR_HELP_TOPICS } from '@/data/supportAndFaqData';
import { SupportRequestDetailModal } from './SupportRequestDetailModal';

interface SharedHelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: RoleType | 'admin';
  supportRequests: SupportRequestItem[];
  onSubmitSupportRequest: (
    role: RoleType | 'admin',
    category: SupportCategory,
    subject: string,
    description: string,
    relatedEntityId?: string
  ) => void;
  initialSearchQuery?: string;
}

export const SharedHelpCenterModal = ({
  isOpen,
  onClose,
  userRole,
  supportRequests,
  onSubmitSupportRequest,
  initialSearchQuery = '',
}: SharedHelpCenterModalProps) => {
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact' | 'history' | 'safety'>('faqs');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [faqRoleFilter, setFaqRoleFilter] = useState<RoleType | 'all'>(userRole === 'admin' ? 'all' : userRole);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Contact Form State
  const [category, setCategory] = useState<SupportCategory>('Order Help');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [relatedEntityId, setRelatedEntityId] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Support Request for Detail View
  const [selectedRequest, setSelectedRequest] = useState<SupportRequestItem | null>(null);

  if (!isOpen) return null;

  // Filter FAQs
  const filteredFaqs = ALL_FAQS.filter((faq) => {
    const matchesRole = faqRoleFilter === 'all' || faq.role === faqRoleFilter || faq.role === 'all';
    
    if (!searchQuery.trim()) return matchesRole;

    const q = searchQuery.toLowerCase();
    const matchesQuery =
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q) ||
      faq.keywords.some((kw) => kw.toLowerCase().includes(q));

    return matchesRole && matchesQuery;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!subject.trim()) {
      setFormError('Please enter a support subject.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please provide a description of your question or issue.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitSupportRequest(
        userRole,
        category,
        subject.trim(),
        description.trim(),
        relatedEntityId.trim() || undefined
      );
      setIsSubmitting(false);
      setFormSuccess('Your demo support request has been recorded.');
      setSubject('');
      setDescription('');
      setRelatedEntityId('');
    }, 300);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-farm-surface text-farm-terracotta border-farm-border';
      case 'Under Review':
        return 'bg-farm-surface-secondary text-farm-terracotta border-farm-gold';
      case 'Resolved':
        return 'bg-farm-brand-soft text-farm-brand border-farm-brand';
      default:
        return 'bg-farm-surface-secondary text-farm-text border-farm-border';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-3xl rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-farm-brand text-white flex items-center justify-between shrink-0 border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-display font-bold">
                  FarmLink Help Centre
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-farm-brand text-white">
                  {userRole.toUpperCase()} HELP
                </span>
              </div>
              <p className="text-xs text-farm-text-secondary">
                Guides, marketplace FAQs, and support ticket management
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-farm-text-secondary hover:text-white hover:bg-farm-brand transition-all cursor-pointer"
            id="close-help-center-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Header */}
        <div className="bg-farm-surface p-2 sm:px-6 border-b border-farm-border flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'faqs', label: 'Help & FAQs', icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'contact', label: 'Contact Support', icon: <Send className="w-4 h-4" /> },
            { id: 'history', label: `My Requests (${supportRequests.length})`, icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'safety', label: 'Safety & Guidance', icon: <ShieldCheck className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setFormSuccess(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-farm-brand text-white shadow-subtle'
                    : 'bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-farm-text">
          {/* TAB 1: FAQS & SEARCH */}
          {activeTab === 'faqs' && (
            <div className="space-y-5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions by keyword (e.g. harvest, prices, delivery, payment)..."
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs text-farm-text-secondary hover:text-farm-text cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Popular Help Topics */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-farm-text-secondary block mb-2">
                  Popular Help Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_HELP_TOPICS.map((topic, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSearchQuery(topic.query)}
                      className="text-[11px] px-3 py-1.5 rounded-xl bg-farm-surface text-farm-terracotta border border-farm-border hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Filter Tabs for FAQs */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-farm-border">
                <span className="text-xs font-bold text-farm-text">Filter FAQs by Role:</span>
                <div className="flex items-center gap-1.5">
                  {(['all', 'farmer', 'buyer', 'logistics'] as const).map((r) => {
                    const isSelected = faqRoleFilter === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setFaqRoleFilter(r)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-farm-brand text-white'
                            : 'bg-farm-surface text-farm-text-secondary hover:bg-farm-surface-secondary'
                        }`}
                      >
                        {r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ Accordion List */}
              {filteredFaqs.length === 0 ? (
                <div className="py-12 bg-farm-surface rounded-2xl border border-farm-border text-center space-y-2">
                  <p className="text-xs font-bold text-farm-text">
                    No FAQs matched &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
                    Try searching with simpler words or switch to &ldquo;Contact Support&rdquo; to send a direct demo inquiry.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setFaqRoleFilter('all');
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Search
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-2xl border border-farm-border overflow-hidden bg-farm-surface shadow-subtle"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-farm-text hover:bg-farm-surface transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-farm-brand-soft text-farm-brand uppercase shrink-0">
                              {faq.category}
                            </span>
                            <span className="truncate">{faq.question}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-farm-text-secondary shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-farm-text-secondary shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="p-4 pt-2 text-xs text-farm-text-secondary leading-relaxed border-t border-farm-border/40 bg-farm-surface">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONTACT SUPPORT DEMO FORM */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border text-xs text-farm-terracotta flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Demo Support Form:</strong> This is a demonstration workflow. No real support request will be sent to external servers. Your ticket is logged locally in this session.
                </p>
              </div>

              {formSuccess ? (
                <div className="p-6 rounded-3xl bg-farm-brand-soft border border-farm-brand/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-farm-brand text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-farm-brand">
                    Support Request Submitted!
                  </h3>
                  <p className="text-xs text-farm-text leading-relaxed max-w-sm mx-auto">
                    {formSuccess} You can track the status of your ticket under the <strong>&ldquo;My Requests&rdquo;</strong> tab.
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('history')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer"
                    >
                      View in My Requests
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormSuccess(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary cursor-pointer"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-farm-danger-soft text-farm-danger rounded-xl text-xs font-bold border border-farm-danger/30">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-farm-text mb-1">
                        Your User Role
                      </label>
                      <input
                        type="text"
                        value={userRole.toUpperCase()}
                        disabled
                        className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text-secondary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-farm-text mb-1">
                        Support Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as SupportCategory)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand cursor-pointer"
                      >
                        <option value="Order Help">Order Help</option>
                        <option value="Listing Help">Listing Help</option>
                        <option value="Delivery Help">Delivery Help</option>
                        <option value="Payment Information">Payment Information</option>
                        <option value="Account Help">Account Help</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-farm-text mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Clarification on farmgate pickup schedule..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-farm-text mb-1">
                      Optional Related Order or Delivery ID
                    </label>
                    <input
                      type="text"
                      value={relatedEntityId}
                      onChange={(e) => setRelatedEntityId(e.target.value)}
                      placeholder="e.g. FL-ORD-2026-891 or FL-DL-001"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-mono focus:outline-none focus:border-farm-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-farm-text mb-1">
                      Detailed Description *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please explain your question or issue in detail..."
                      rows={4}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-farm-border">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle cursor-pointer disabled:opacity-50"
                      id="submit-support-ticket-btn"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {isSubmitting ? 'Recording...' : 'Submit Support Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: MY SUPPORT REQUESTS (HISTORY) */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-farm-text">
                  My Support Tickets ({supportRequests.length})
                </span>
                <span className="text-[11px] font-bold text-farm-terracotta bg-farm-surface px-2.5 py-0.5 rounded-full border border-farm-border">
                  Illustrative demo records
                </span>
              </div>

              {supportRequests.length === 0 ? (
                <div className="py-12 bg-farm-surface rounded-3xl border border-farm-border text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-farm-text">
                    You haven’t created any support requests yet.
                  </h3>
                  <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
                    Need help with a trade, listing, or delivery? Use the &ldquo;Contact Support&rdquo; tab to raise a ticket.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {supportRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle hover:border-farm-brand/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono font-bold text-xs text-farm-brand bg-farm-brand-soft px-2 py-0.5 rounded-lg">
                            {req.referenceId}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(req.status)}`}>
                            {req.status}
                          </span>
                          <span className="text-xs text-farm-text-secondary">
                            {req.category} &bull; {req.createdAt}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-farm-text mb-0.5">
                          {req.subject}
                        </h4>
                        <p className="text-xs text-farm-text-secondary line-clamp-1">
                          {req.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedRequest(req)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-text hover:bg-farm-surface-secondary border border-farm-border transition-all cursor-pointer shrink-0 self-end sm:self-center"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SAFETY & GUIDANCE */}
          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-farm-brand-soft border border-farm-brand/20 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-farm-brand" />
                  <h3 className="text-sm font-bold text-farm-brand">
                    Safe Agricultural Marketplace Guidelines
                  </h3>
                </div>
                <p className="text-xs text-farm-text leading-relaxed">
                  FarmLink is committed to transparent, direct farm-to-market trading. We protect our community through certified farmer lot declarations, verified business entities, APMC-regulated escrow payments, and temperature-monitored logistics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle space-y-1.5">
                  <h4 className="text-xs font-bold text-farm-text flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-farm-brand" />
                    Escrow Fund Protection
                  </h4>
                  <p className="text-xs text-farm-text-secondary leading-relaxed">
                    Buyer funds remain safely secured in escrow upon order confirmation and are only released to the farmer after quality verification and electronic POD.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle space-y-1.5">
                  <h4 className="text-xs font-bold text-farm-text flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-farm-brand" />
                    Standardized Quality Grading
                  </h4>
                  <p className="text-xs text-farm-text-secondary leading-relaxed">
                    Grade A+, Grade A, and Grade B classifications help ensure predictable produce condition and eliminate disputes at receiving docks.
                  </p>
                </div>
              </div>

              {/* Notice regarding future support channels */}
              <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border text-center space-y-1">
                <p className="text-xs font-bold text-farm-terracotta">
                  Official Contact Channels Notice
                </p>
                <p className="text-xs text-farm-text-secondary">
                  Support contact details will be available in a future version. Use the in-app support request form for current inquiries.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-farm-surface border-t border-farm-border flex justify-between items-center shrink-0">
          <span className="text-[11px] text-farm-text-secondary">
            FarmLink Support Engine &bull; Version 2.0
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand cursor-pointer"
          >
            Close Help Centre
          </button>
        </div>
      </div>

      {/* Support Request Detail Sub-Modal */}
      <SupportRequestDetailModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};
