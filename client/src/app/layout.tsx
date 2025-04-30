import { Metadata } from "next";
import { systemUi } from "../fonts/config";
import "./globals.css";
import Header from "../components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/contexts/cartContext";


export const metadata: Metadata = {
  title: "Gstore",
  description: "store e-commerce solution",
  keywords: ["e-commerce", "shopping", "store"],
  openGraph: {
    title: "Gstore",
    description: "e-commerce solution",
    url: "",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className={`${systemUi.className} antialiased`}>
      <CartProvider>
   
      <div className="min-h-screen flex flex-col mx-auto">
            <Header />
            <main className="flex-1 container mx-auto px-2 py-4">
              {children}
            </main>
            <Footer />
          </div>
      </CartProvider >
          
      </body>
    </html>
  );
}