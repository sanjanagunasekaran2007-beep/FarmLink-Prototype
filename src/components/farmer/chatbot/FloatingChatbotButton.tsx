import { Bot, Sparkles } from 'lucide-react';

interface FloatingChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FloatingChatbotButton = ({ onClick, isOpen }: FloatingChatbotButtonProps) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 select-none">
      <button
        type="button"
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-farm-brand text-white border-2 border-farm-brand shadow-elevated hover:bg-farm-brand-hover active:scale-95 transition-all cursor-pointer"
        aria-label="Open FarmLink AI"
        id="floating-ai-btn"
      >
        <div className="w-8 h-8 rounded-full bg-farm-brand text-farm-gold flex items-center justify-center border border-farm-brand relative">
          <Bot className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-farm-gold border-2 border-farm-brand" />
        </div>

        <div className="flex flex-col items-start pr-1 text-left hidden sm:flex">
          <span className="text-xs font-display font-bold leading-tight flex items-center gap-1">
            <span>FarmLink AI</span>
            <Sparkles className="w-3 h-3 text-farm-gold" />
          </span>
          <span className="text-[10px] text-farm-text-secondary font-medium leading-none">
            Agri Assistant
          </span>
        </div>
      </button>
    </div>
  );
};
