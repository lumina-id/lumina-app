interface MessageInputProps {
  message: string;
  placeholder: string;
  isActive?: boolean;
  onSendClick?: () => void;
  onTelegramClick?: () => void;
}

export default function MessageInput({
  message,
  placeholder,
  isActive = false,
  onSendClick,
  onTelegramClick,
}: MessageInputProps) {
  const hasMessage = message.length > 0;

  return (
    <div
      className={`w-full flex items-center gap-3 p-4 rounded-[16px] border-2 transition-colors ${
        isActive ? "border-[#3b82f6] bg-white" : "border-[#e2e8f0] bg-[#f8fafc]"
      }`}
    >
      <div className="flex-1 min-h-[24px]">
        {hasMessage ? (
          <p className="text-[16px] text-[#202020] tracking-[-0.64px]">{message}</p>
        ) : (
          <p className="text-[16px] text-[#94a3b8] tracking-[-0.64px]">{placeholder}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSendClick}
          className="w-[40px] h-[40px] flex items-center justify-center bg-[#3b82f6] rounded-[10px] hover:bg-[#2563eb] transition-colors"
          aria-label="Send message"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L11 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={onTelegramClick}
          className="w-[40px] h-[40px] flex items-center justify-center bg-[#3b82f6] rounded-[10px] hover:bg-[#2563eb] transition-colors"
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
  );
}
