import { Bot, Sparkles, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '@/data/chatbotData';

interface AskFarmLinkAISectionProps {
  onOpenChat: (initialPrompt?: string) => void;
}

export const AskFarmLinkAISection = ({ onOpenChat }: AskFarmLinkAISectionProps) => {
  return (
    <section 
      aria-label="Ask FarmLink AI Section" 
      className="bg-farm-brand text-white rounded-3xl p-5 sm:p-7 shadow-card border border-farm-border select-none space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-brand text-farm-gold text-[11px] font-bold uppercase tracking-wider border border-farm-border">
            <Sparkles className="w-3.5 h-3.5 text-farm-gold" />
            <span>Agricultural Assistant</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white">
            Ask FarmLink AI
          </h2>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            Get simple guidance for your farming journey. Ask about mandi spot rates, harvest timing, finding verified buyers, or tracking payments.
          </p>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={() => onOpenChat()}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-farm-surface text-farm-text font-display font-bold text-xs sm:text-sm hover:bg-farm-surface active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-border"
            id="dashboard-open-ai-btn"
          >
            <Bot className="w-4 h-4 text-farm-brand" />
            <span>Open FarmLink AI</span>
            <ArrowRight className="w-3.5 h-3.5 text-farm-terracotta" />
          </button>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="pt-2 border-t border-white/15">
        <div className="flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary mb-2.5">
          <HelpCircle className="w-3.5 h-3.5 text-farm-gold" />
          <span>Popular Farming Questions:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SUGGESTED_QUESTIONS.slice(0, 4).map((question, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onOpenChat(question)}
              className="p-3 rounded-2xl bg-farm-brand/80 text-white text-left text-xs font-medium hover:bg-farm-brand hover:text-farm-gold transition-all border border-farm-border flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="line-clamp-2">{question}</span>
              <MessageCircle className="w-3.5 h-3.5 text-farm-gold shrink-0 opacity-80" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
