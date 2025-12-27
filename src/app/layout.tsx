import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GazeProvider } from "../context/GazeContext";

const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina",
  description: "Lumina App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <GazeProvider>{children}</GazeProvider>
      </body>
    </html>
  );
}
