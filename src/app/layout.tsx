import type { Metadata } from "next";
import localFont from "next/font/local";
import { GazeProvider } from "../context/GazeContext";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina - Smart AAC",
  description: "Empowering communication through gaze tracking and AI.",
  icons: {
    icon: "/assets/lumina-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <LanguageProvider>
          <GazeProvider>{children}</GazeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
