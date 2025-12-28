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
  isActive = false,
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
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#0B1FB7] rounded-[10px] hover:bg-[#091699] transition-colors"
            aria-label="Speak message"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 10c0-1.5-.5-3-1.5-4M20 8c0-2.5-1-5-3-6.5M12 6v12c0 1-1 2-2 2H8c-1 0-2-1-2-2V6c0-1 1-2 2-2h2c1 0 2 1 2 2z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 14h4M8 10h4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            onClick={onTelegramClick}
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#0B1FB7] rounded-[10px] hover:bg-[#091699] transition-colors"
            aria-label="Send via Telegram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-17.4 7.124a2.287 2.287 0 00.156 4.251l4.144 1.59 1.866 5.6a1.288 1.288 0 001.22.883 1.278 1.278 0 001.05-.546l2.164-3.03 4.125 3.03a2.24 2.24 0 003.508-1.246l3.5-14.998a2.242 2.242 0 00-2.31-2.873z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
