import LayoutComp from "./Components/LayoutComp";
import "./globals.css";
import { Amiri, Reem_Kufi, Playfair_Display, Outfit } from "next/font/google";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
});

const reem = Reem_Kufi({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-reem",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "المنشاوي | التراث الخالد للشيخ محمد صديق المنشاوي",
  description: "الموقع الرسمي المخصص لتراث فضيلة الشيخ محمد صديق المنشاوي. استمع إلى روائع التلاوات والمصحف المجود والمرتل بجودة عالية.",
  keywords: "المنشاوي, محمد صديق المنشاوي, القرآن الكريم, تجويد, ترتيل, تلاوات نادرة",
  openGraph: {
    title: "تراث الشيخ محمد صديق المنشاوي",
    description: "استمع إلى أعذب التلاوات بصوت الشيخ المنشاوي",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={`${reem.variable} ${amiri.variable} ${playfair.variable} ${outfit.variable} font-sans antialiased bg-cream text-primary overflow-x-hidden`}
      >
        <LayoutComp>
          {children}
        </LayoutComp>
      </body>
    </html>
  );
}
