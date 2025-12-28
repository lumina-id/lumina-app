
interface MessageInputProps {
  message: string;
  placeholder: string;
  isActive?: boolean;
  onSpeakClick?: () => void;
  onTelegramClick?: () => void;
}

export default function MessageInput({
  message,
  placeholder,
  onSpeakClick,
  onTelegramClick,
}: MessageInputProps) {
  const hasMessage = message.length > 0;

  return (
    <div className="w-full bg-white rounded-[20px] p-5 border border-[#e5e7eb] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-h-[24px]">
          {hasMessage ? (
            <p className="text-[16px] text-[#111827] tracking-[-0.4px]">{message}</p>
          ) : (
            <p className="text-[16px] text-[#9ca3af] tracking-[-0.4px]">{placeholder}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSpeakClick}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-[10px] hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(180deg, #354BF3 0%, #0B1FB7 100%)"
            }}
            aria-label="Speak message"
          >
            <img 
              src="/assets/Record voice over.svg" 
              alt="Record voice" 
              width={20} 
              height={20} 
            />
          </button>

          <button
            onClick={onTelegramClick}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-[10px] hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(180deg, #354BF3 0%, #0B1FB7 100%)"
            }}
            aria-label="Send via Telegram"
          >
            <img 
              src="/assets/Vector.svg" 
              alt="Send" 
              width={20} 
              height={20} 
            />
          </button>
        </div>
      </div>
    </div>
  );
}