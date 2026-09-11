import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

// Variable font with real 400-900 cuts, so the heavy weights used across the
// hero are true bolds rather than the browser's synthesised faux-bold.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Snow Plow Referrals | Local Work. Real Rewards.",
  description:
    "A straightforward referral program connecting customers, trusted referrers, and dependable snow removal professionals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
