"use client";

import NotFoundPage from "@/components/common/NotFoundPage";
import NotFoundLayout from "@/components/layout/common/NotFoundLayout";
import { ModalProvider } from "@/contexts/modalContext";
import { Manrope, Noto_Sans } from "next/font/google";
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

export default function NotFound() {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${noto.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <ModalProvider>
          <NotFoundLayout>
            <NotFoundPage />
          </NotFoundLayout>
        </ModalProvider>
      </body>
    </html>
  );
}
