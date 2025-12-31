interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-[480px] mx-auto px-4 md:px-0">
      <div className="bg-white rounded-[24px] shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-[32px] md:p-[48px]">
        <div className="flex flex-col items-center text-center mb-[32px]">
          <h1 className="text-[24px] md:text-[32px] font-semibold italic text-black tracking-[-0.5px] mb-[8px]">
            {title}
          </h1>
          <p className="text-[14px] md:text-[16px] text-[#6b7280] tracking-[-0.3px] font-normal">
            {subtitle}
          </p>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
