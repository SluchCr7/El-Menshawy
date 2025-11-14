import LayoutComp from "./Components/LayoutComp";
import "./globals.css";
import {Amiri} from 'next/font/google'
import { Tajawal } from "next/font/google";
import { Reem_Kufi } from "next/font/google";
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const tajawal = Tajawal({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const reem = Reem_Kufi({
  weight: ["400", "700"],
  subsets: ["latin"]
})

export const metadata = {
  title: "ElMenshawy",
  description: "الموقع الرسمي لفضيلةالشيخ محمد صديق المنشاوي",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        dir="rtl"
        className={`${reem.className} antialiased`}
      >
        <LayoutComp>
          {children}
        </LayoutComp>
      </body>
    </html>
  );
}
