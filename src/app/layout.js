import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Apply to the World's Top 100 Universities | PFEC Global",
  description:
    "Check your eligibility for the world's top 100 universities. Get expert guidance and FREE end-to-end application assistance from PFEC Global.",
};

export const viewport = {
  themeColor: "#100694",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${montserrat.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-ink">{children}</body>
    </html>
  );
}
