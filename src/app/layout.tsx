import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalBackgroundVideo from "@/components/GlobalBackgroundVideo";

// System Serif Typography - Classic Editorial Style
// Uses native system fonts for optimal performance and elegant appearance
// font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif

export const metadata: Metadata = {
  title: "Kim's Pork Hub | The Gold Standard",
  description: "Experience the ritual of the roast in a premium setting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload first frame for faster perceived load */}
        <link rel="preload" href="/images/sequence/frame_000.jpg" as="image" />
        <link rel="preload" href="/images/sequence/frame_001.jpg" as="image" />
        <link rel="preload" href="/images/sequence/frame_002.jpg" as="image" />
      </head>
      <body
        className="antialiased bg-black text-light-gray selection:bg-gold selection:text-black"
      >
        <GlobalBackgroundVideo />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
