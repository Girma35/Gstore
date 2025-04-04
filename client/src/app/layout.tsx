import { systemUi } from "../fonts/config";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next JS Template",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={systemUi.className}>{children}</body>
    </html>
  );
}
