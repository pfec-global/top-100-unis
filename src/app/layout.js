import { Bebas_Neue, Montserrat } from "next/font/google";
import Script from "next/script";

// Tracking IDs come from .env
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
import "./globals.css";
import { asset } from "@/lib/asset";

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
  icons: {
    icon: { url: asset("/PFEC-Favicon.webp"), type: "image/webp" },
    apple: asset("/PFEC-Favicon.webp"),
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const viewport = {
  themeColor: "#100694",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${bebas.variable} ${montserrat.variable} scroll-smooth antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full bg-white font-sans text-ink">
        {children}

        {/* Google tag (gtag.js) — Google Ads */}
        {GOOGLE_ADS_ID && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
            <Script id="google-ads-gtag" strategy="afterInteractive">
              {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GOOGLE_ADS_ID}');
`}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* End Google Tag Manager */}
      </body>
    </html>
  );
}
