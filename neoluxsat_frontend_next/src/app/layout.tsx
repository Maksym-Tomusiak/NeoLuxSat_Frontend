// src/app/layout.tsx
import type { Metadata, Viewport } from "next"; // 1. Import Viewport
import { Manrope, Noto_Sans } from "next/font/google";

import { Providers } from "./providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const noto = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-noto",
});

// 2. Your metadata object (without viewport)
export const metadata: Metadata = {
  title: "NeoLuxSat",
  verification: {
    google: "Sxj-9CvDxz7pedOEIpFwWoGFOE_yk-puj90ojxQllqU",
  },
  icons: [
    { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    {
      url: "/icon.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/iconDark.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

// 3. The new, separate viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${noto.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
