import type { Metadata } from "next";
import { Chango } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

import nextFontLocal from "next/font/local";

const fontGluten = nextFontLocal({
  src: [
    {
      path: "../../public/fonts/Gluten-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gluten-Extralight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gluten-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gluten-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gluten-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gluten-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gluten-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gluten-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gluten",
  display: "swap",
});

const fontChango = Chango({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chango",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Homely - Find Your Perfect Home",
  description:
    "Discover your dream home with Homely. Browse listings, explore neighborhoods, and connect with trusted agents to find the perfect place to call home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontGluten.variable} ${fontChango.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
