import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { StatusGate } from "@/components/auth/StatusGate";
import { getAllSettings } from "@/data/content-manager";
import { currentUser } from "@/lib/auth";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "EasyShares | Make Money Online Selling Shares",
    template: " %s - EasyShares",
  },
  description:
    "EasyShares offers an innovative online platform for shares exchange, featuring a unique Rate of Investment (ROI) system. Users can customize their ROI from 20% to 50%, buying shares at discounted rates and selling them for handsome returns. Our automated system ensures efficient matching of buyers and sellers, operating on a 'First come, first served' basis. With more than 1,000,000,000 shares in circulation, each valued at 1 Ksh, EasyShares presents a lucrative opportunity for investors. Join us today to experience seamless share exchange and maximize your returns effortlessly!",

  keywords: [
    "EasyShares",
    "Shares Exchange",
    "ROI",
    "Investment",
    "Online Platform",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const settings: any = await getAllSettings();
  return (
    <html lang="en" className={`${nunito.className}`}>
      <body>
        <StatusGate user={user} settings={settings[0]}>
          {children}
        </StatusGate>
      </body>
    </html>
  );
}
