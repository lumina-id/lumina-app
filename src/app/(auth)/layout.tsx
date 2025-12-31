import { LanguageProvider } from "@/context/LanguageContext";
import { AuthHeader, AuthBackground } from "@/components/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative flex flex-col">
        <AuthBackground />
        <AuthHeader />
        <main className="flex-1 flex items-center justify-center pt-[100px] pb-[60px] relative z-[1]">
          {children}
        </main>
      </div>
    </LanguageProvider>
  );
}
