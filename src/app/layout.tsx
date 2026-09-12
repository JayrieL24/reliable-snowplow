import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snowplow-referrals.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Snowplow Referrals | Make the Connection",
  description: "Refer a customer who needs snow service or a dependable worker ready for winter work.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Snowplow Referrals | Make the Connection",
    description: "Refer customers. Refer workers. Help build a better winter.",
    url: "/",
    siteName: "Snowplow Referrals",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/opengraph-snowplow-referrals-v5.jpg",
        width: 1200,
        height: 630,
        alt: "Snowplow Referrals — make the connection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snowplow Referrals | Make the Connection",
    description: "Refer customers. Refer workers. Help build a better winter.",
    images: ["/images/opengraph-snowplow-referrals-v5.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
