import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins, Geist } from "next/font/google";
import { SearchModal } from "../components/modal/searchModal";
import { MobileBlocker } from "../components/mobileBlocker";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Build&Go Concept Website",
  description: "Finance clarity and automated receipt extraction for construction businesses. Track real margins, forecast profits, and manage projects easily.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bricolageGrotesque.variable, poppins.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1 flex flex-col max-[719px]:hidden">
          {children}
        </div>
        <SearchModal />
        <MobileBlocker />
      </body>
    </html>
  );
}
