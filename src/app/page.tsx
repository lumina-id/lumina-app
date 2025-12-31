import {
  LandingNavbar,
  HeroSection,
  CommunicationSection,
  FeaturesSection,
  FooterSection,
} from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <HeroSection />
      <CommunicationSection />
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}
