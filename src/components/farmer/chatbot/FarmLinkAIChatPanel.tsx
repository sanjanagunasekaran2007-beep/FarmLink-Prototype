import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Trash2, 
  Globe, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { ChatMessage, ChatAction, FarmerTab } from '@/types';
import { 
  CHATBOT_LANGUAGES, 
  SUGGESTED_QUESTIONS, 
  QUICK_ACTIONS, 
  findChatResponse,
  ChatLanguageOption
} from '@/data/chatbotData';

interface FarmLinkAIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: FarmerTab) => void;
  onOpenAddHarvest: () => void;
  onOpenHelpCenter?: () => void;
  initialPrompt?: string | null;
}

export const FarmLinkAIChatPanel = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenAddHarvest,
  onOpenHelpCenter,
  initialPrompt,
}: FarmLinkAIChatPanelProps) => {
  // Read stored language or default to English
  const [currentLang, setCurrentLang] = useState<'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn'>(() => {
    try {
      const stored = localStorage.getItem('farmlink_language');
      if (stored === 'Tamil' || stored === 'தமிழ்') return 'ta';
      if (stored === 'Hindi' || stored === 'हिन्दी') return 'hi';
      if (stored === 'Telugu' || stored === 'తెలుగు') return 'te';
      if (stored === 'Malayalam' || stored === 'മലയാളം') return 'ml';
      if (stored === 'Kannada' || stored === 'ಕನ್ನಡ') return 'kn';
      return 'en';
    } catch {
      return 'en';
    }
  });

  const getInitialGreeting = (langCode: 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn'): ChatMessage => {
    const langObj = CHATBOT_LANGUAGES.find((l) => l.code === langCode) || CHATBOT_LANGUAGES[0];
    return {
      id: 'msg-welcome',
      sender: 'assistant',
      text: langObj.greeting,
      timestamp: 'Just now',
      isGreeting: true,
      actions: [
        { label: '+ Add Harvest', actionType: 'open_add_harvest' },
        { label: 'View Market Prices', actionType: 'navigate', targetTab: 'market' },
        { label: 'Find Buyers', actionType: 'navigate', targetTab: 'buyers' },
      ],
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialGreeting(currentLang)]);
  const [inputText, setInputText] = useState('');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle initial prompt passed from outside
  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    // Calculate response
    const result = findChatResponse(query, currentLang);
    const assistantMessage: ChatMessage = {
      id: `msg-ai-${Date.now() + 1}`,
      sender: 'assistant',
      text: result.text,
      timestamp: 'Just now',
      actions: result.actions,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInputText('');
  };

  const handleClearChat = () => {
    setMessages([getInitialGreeting(currentLang)]);
  };

  const handleLanguageChange = (lang: ChatLanguageOption) => {
    setCurrentLang(lang.code);
    setIsLanguageMenuOpen(false);
    // Add assistant language greeting switch message
    const switchMessage: ChatMessage = {
      id: `msg-switch-${Date.now()}`,
      sender: 'assistant',
      text: lang.greeting,
      timestamp: 'Just now',
      actions: [
        { label: '+ Add Harvest', actionType: 'open_add_harvest' },
        { label: 'View Market Prices', actionType: 'navigate', targetTab: 'market' },
      ],
    };
    setMessages((prev) => [...prev, switchMessage]);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.actionType === 'open_add_harvest') {
      onClose();
      onOpenAddHarvest();
    } else if (action.actionType === 'open_help_center') {
      onClose();
      if (onOpenHelpCenter) onOpenHelpCenter();
    } else if (action.actionType === 'navigate' && action.targetTab) {
      onClose();
      onNavigateTab(action.targetTab as FarmerTab);
    } else if (action.actionType === 'prompt' && action.promptText) {
      handleSendMessage(action.promptText);
    }
  };

  const selectedLangObj = CHATBOT_LANGUAGES.find((l) => l.code === currentLang) || CHATBOT_LANGUAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-farm-brand/60 backdrop-blur-sm transition-opacity">
      {/* Container: Right Panel on Desktop, Full/Near-Full Bottom Sheet on Mobile */}
      <div 
        className="w-full sm:max-w-lg md:max-w-xl h-full bg-farm-surface border-l border-farm-border flex flex-col justify-between shadow-elevated select-none overflow-hidden"
        role="dialog"
        aria-label="FarmLink AI Chatbot"
      >
        {/* 1. TOP CHATBOT HEADER */}
        <div className="bg-farm-brand text-white p-4 sm:p-5 border-b border-farm-brand flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-farm-gold shadow-subtle shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base sm:text-lg text-white">
                  FarmLink AI
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-farm-brand text-farm-gold text-[10px] font-bold border border-farm-brand">
                  Demo Assistant
                </span>
              </div>
              <p className="text-xs text-white/70 font-medium">
                Agricultural Assistant & Marketplace Guide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Selector Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="h-9 px-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand flex items-center gap-1.5 border border-farm-brand cursor-pointer"
                title="Change Language"
                id="chatbot-lang-btn"
              >
                <Globe className="w-3.5 h-3.5 text-farm-gold" />
                <span className="text-[11px]">{selectedLangObj.native}</span>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-11 z-50 w-44 bg-farm-brand border border-farm-brand rounded-2xl shadow-elevated p-1.5 space-y-1">
                  {CHATBOT_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-farm-brand text-farm-gold'
                          : 'text-white/80 hover:bg-farm-brand hover:text-white'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-white/50">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Conversation */}
            <button
              type="button"
              onClick={handleClearChat}
              className="w-9 h-9 rounded-xl bg-farm-brand text-white/70 hover:text-farm-danger hover:bg-farm-brand flex items-center justify-center cursor-pointer border border-farm-brand"
              title="Clear Conversation"
              aria-label="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-farm-brand text-white hover:bg-farm-danger flex items-center justify-center cursor-pointer border border-farm-brand"
              aria-label="Close Chat"
              id="chatbot-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. DEMO DISCLAIMER BANNER */}
        <div className="bg-farm-surface px-4 py-2 border-b border-farm-border flex items-center gap-2 text-[11px] text-farm-text-secondary">
          <ShieldAlert className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
          <span className="truncate">
            General guidance only. Consult local agriculture experts for chemical & pest decisions.
          </span>
        </div>

        {/* 3. CHAT MESSAGE AREA */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-farm-surface-secondary/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-subtle ${
                    isUser
                      ? 'bg-farm-brand text-white rounded-tr-none border border-farm-brand'
                      : 'bg-farm-surface text-farm-text rounded-tl-none border border-farm-border'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-farm-border/60 text-[11px] font-bold text-farm-brand">
                      <Bot className="w-3.5 h-3.5 text-farm-terracotta" />
                      <span>FarmLink AI</span>
                    </div>
                  )}

                  <div className="whitespace-pre-line space-y-1">
                    {msg.text}
                  </div>

                  {/* Smart Navigation Actions embedded in AI response */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="pt-3 mt-2 border-t border-farm-border flex flex-wrap gap-1.5">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="px-3 py-1.5 rounded-xl bg-farm-brand-soft text-farm-brand text-xs font-bold hover:bg-farm-brand hover:text-white transition-all flex items-center gap-1 cursor-pointer border border-farm-border"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-farm-text-secondary px-2 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* 4. SUGGESTED QUESTIONS & QUICK ACTIONS */}
        <div className="bg-farm-surface border-t border-farm-border p-3 space-y-2.5 shrink-0">
          {/* Quick Action Navigation Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] font-bold uppercase text-farm-text-secondary shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-farm-gold" />
              <span>Quick:</span>
            </span>
            {QUICK_ACTIONS.map((qa, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (qa.action) {
                    handleActionClick(qa.action);
                  } else {
                    handleSendMessage(qa.prompt);
                  }
                }}
                className="px-2.5 py-1 rounded-xl bg-farm-surface text-farm-text text-[11px] font-bold hover:bg-farm-brand hover:text-white shrink-0 border border-farm-border cursor-pointer transition-all"
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* Suggested Questions Horizontal Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold uppercase text-farm-text-secondary shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-farm-terracotta" />
              <span>Ask:</span>
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1 rounded-xl bg-farm-surface-secondary text-farm-text text-[11px] font-medium hover:bg-farm-brand-soft hover:text-farm-brand shrink-0 border border-farm-border cursor-pointer transition-all flex items-center gap-1"
              >
                <span>{q}</span>
                <ChevronRight className="w-3 h-3 text-farm-text-secondary" />
              </button>
            ))}
          </div>

          {/* 5. TEXT INPUT BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about crops, mandis, buyers, or orders..."
              className="flex-1 px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs sm:text-sm text-farm-text placeholder:text-farm-text-secondary focus:outline-none focus:border-farm-brand"
              id="chatbot-input"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                inputText.trim()
                  ? 'bg-farm-brand text-white border-farm-brand hover:bg-farm-brand-hover active:scale-95 shadow-subtle'
                  : 'bg-farm-surface-secondary text-farm-text-secondary border-transparent cursor-not-allowed opacity-60'
              }`}
              aria-label="Send Message"
              id="chatbot-send-btn"
            >
              <Send className="w-4 h-4 text-farm-gold" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
