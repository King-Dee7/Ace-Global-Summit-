import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import LenisProvider from "@/components/motion/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACE GLOBAL SUMMIT | December 23, 2026 | Accra Marriott Hotel",
  description:
    "ACE Global Summit brings together global investors, leaders, and innovators to connect capital with opportunity. Join us in Accra, Dec 23, 2026 to meet the people building what's next!",
  keywords: [
    "ACE Global Summit",
    "Accra Marriott Hotel",
    "Reinvent Africa Network",
    "African tech investment",
    "Ghana December summit",
    "Venture capital Africa",
    "Diaspora investment Ghana",
    "Investor Dealroom Accra",
  ],
  authors: [{ name: "Reinvent Africa Network" }],
  openGraph: {
    title: "ACE GLOBAL SUMMIT | December 23, 2026 | Accra Marriott Hotel",
    description:
      "Meet the people building what's next across a full day of high-impact conversations, breakthrough ideas, and strategic connections in Accra.",
    url: "https://aceglobalsummit.com",
    siteName: "ACE GLOBAL SUMMIT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE GLOBAL SUMMIT | Accra 2026",
    description: "Meet the people building what's next. December 23, 2026 at Accra Marriott Hotel.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#62060E] text-white font-sans antialiased selection:bg-[#FF6417] selection:text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
