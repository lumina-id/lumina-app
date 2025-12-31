interface AuthButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function AuthButton({
  children,
  type = "submit",
  onClick,
  disabled = false,
  loading = false,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ 
        background: 'linear-gradient(180deg, #1a2a8f 0%, #081787 100%)',
        boxShadow: '0 4px 12px rgba(8, 23, 135, 0.35)'
      }}
      className="w-full py-[14px] md:py-[16px] hover:opacity-95 text-white font-semibold text-[14px] md:text-[16px] rounded-[14px] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
