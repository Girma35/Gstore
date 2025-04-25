import { systemUi } from "../fonts/config";
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Gstore",
  description: "Your e-commerce solution",
  // Add more metadata as needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className={`${systemUi.className} antialiased`}>
        {/* 
          Providers wraps all client components that need Redux/context
          This must be a client component itself
        */}
        <Providers>
          <div className="min-h-screen flex flex-col mx-auto">
            {/* 
              Header should be a client component if it uses Redux/state
              Otherwise, it can remain a server component
            */}
            <Header />
            <main className="flex-1 container mx-auto px-2 py-4">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
