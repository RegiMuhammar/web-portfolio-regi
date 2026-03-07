import { Epilogue, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlowOrbs from "@/components/GlowOrbs";

const epilogue = Epilogue({
  variable: "--font-epilogue",
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
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
      >
        <GlowOrbs />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
