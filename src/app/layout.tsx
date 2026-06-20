import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discover Motherland Africa Tours | Premium African Safari & Travel Experiences",
  description:
    "Embark on extraordinary journeys across Africa with Discover Motherland Africa Tours. " +
    "Curated luxury safaris, cultural expeditions, and iconic landmark tours across South Africa, " +
    "Zambia, Zimbabwe, Kenya and beyond.",
  keywords: [
    "Africa tours", "African safari", "Kruger Park", "Victoria Falls",
    "Sun City", "Gold Reef City", "luxury travel", "South Africa tourism",
    "Pan-Africa destinations", "safari packages",
  ],
  openGraph: {
    title: "Discover Motherland Africa Tours",
    description: "Premium African safari and travel experiences curated for the discerning explorer.",
    type: "website",
    locale: "en_ZA",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
