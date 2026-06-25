import { Raleway, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "Regi Muhammar — Data Analytics & Engineering",
  description:
    "Data Analyst & AI Engineer turning complex datasets into strategic intelligence. From AI pipelines to executive dashboards.",
  icons: {
    icon: "/site-icon-regi.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
      >
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
