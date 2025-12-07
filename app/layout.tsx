import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // 1. Import new fonts
import "./globals.css";
import { Footer } from './components/Footer';

// 2. Configure the fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif", // This matches your Tailwind config
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yale Art - The Curated Void",
  description: "A minimalist digital archive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        // 3. Apply the variables here
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-black`}
      >
        <div className="bg-noise"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}