import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "../components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EcoRecycle - Plastic Waste Management",
  description: "A platform connecting waste collectors, communities, and businesses for sustainable plastic recycling in Sri Lanka.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
