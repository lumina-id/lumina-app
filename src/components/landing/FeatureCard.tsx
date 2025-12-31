interface FeatureCardProps {
  title: string;
  description: string;
  icon: "speech" | "context" | "accessible" | "messaging";
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div 
      className="relative rounded-[20px] p-6 md:p-8 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #12162f 0%, #1a1f3a 50%, #232850 100%)",
        minHeight: "320px",
      }}
    >
      {/* Icon/Visualization area */}
      <div className="relative h-[160px] md:h-[180px] mb-6 flex items-center justify-center">
        {icon === "speech" && <SpeechIcon />}
        {icon === "context" && <ContextIcon />}
        {icon === "accessible" && <AccessibleIcon />}
        {icon === "messaging" && <MessagingIcon />}
      </div>

      {/* Content */}
      <h3 className="text-[18px] md:text-[20px] font-semibold text-white mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-[14px] text-white/60 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function SpeechIcon() {
  return (
    <div className="relative">
      {/* Connection lines */}
      <svg className="w-[160px] h-[120px]" viewBox="0 0 160 120">
        <path d="M30 80 L80 60 L130 40" stroke="rgba(99,102,241,0.3)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
        <path d="M30 80 L80 60" stroke="rgba(99,102,241,0.5)" strokeWidth="2" fill="none" />
        {/* Nodes */}
        <circle cx="30" cy="80" r="16" fill="#1e2340" stroke="rgba(99,102,241,0.5)" strokeWidth="2" />
        <circle cx="80" cy="60" r="20" fill="#2a3055" stroke="rgba(99,102,241,0.5)" strokeWidth="2" />
        <circle cx="130" cy="40" r="14" fill="#1e2340" stroke="rgba(99,102,241,0.5)" strokeWidth="2" />
      </svg>
      {/* User icon */}
      <div className="absolute top-[5px] left-[5px] w-[24px] h-[24px] flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      {/* Arrows */}
      <div className="absolute top-[20px] left-[60px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <path d="M7 16V4m0 0L3 8m4-4l4 4" />
          <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </div>
      {/* Microphone */}
      <div className="absolute top-0 right-[10px] w-[28px] h-[28px] rounded-full bg-[#2a3055] flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </div>
    </div>
  );
}

function ContextIcon() {
  return (
    <div className="w-full max-w-[200px] rounded-[12px] bg-[#f8f9fa] p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-[24px] h-[24px] rounded-full bg-[#2a3055] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <span className="text-[13px] font-medium text-black">Response Suggestions</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between px-3 py-2 bg-[#2a3055] rounded-[8px]">
          <span className="text-[12px] text-white">Yes, please</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
            <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>
        <div className="px-3 py-2 bg-white border border-gray-200 rounded-[8px]">
          <span className="text-[12px] text-gray-600">I&apos;m okay right now</span>
        </div>
        <div className="px-3 py-2 bg-white border border-gray-200 rounded-[8px]">
          <span className="text-[12px] text-gray-600">I need some help</span>
        </div>
      </div>
    </div>
  );
}

function AccessibleIcon() {
  return (
    <div className="flex items-center gap-6">
      {/* Eye icon */}
      <div className="w-[50px] h-[50px] rounded-[12px] bg-[#1e2340] border border-white/10 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      {/* Center icon with Lumina */}
      <div className="w-[64px] h-[64px] rounded-[16px] bg-[#3b4ade] flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      {/* Bluetooth icon */}
      <div className="w-[50px] h-[50px] rounded-[12px] bg-[#1e2340] border border-white/10 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
        </svg>
      </div>
    </div>
  );
}

function MessagingIcon() {
  return (
    <div className="relative">
      {/* Center Lumina icon */}
      <div className="w-[56px] h-[56px] rounded-full bg-[#3b4ade] flex items-center justify-center mx-auto">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      {/* Surrounding app icons */}
      <div className="absolute -top-4 -left-8 w-[40px] h-[40px] rounded-full bg-[#1e2340] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 7L2 7" />
        </svg>
      </div>
      <div className="absolute -top-4 right-[-32px] w-[40px] h-[40px] rounded-full bg-[#1e2340] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </div>
      <div className="absolute top-[50px] -left-12 w-[36px] h-[36px] rounded-full bg-[#1e2340] flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <div className="absolute top-[50px] right-[-48px] w-[36px] h-[36px] rounded-full bg-[#1e2340] flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
    </div>
  );
}
