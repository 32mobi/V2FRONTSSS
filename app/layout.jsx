import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";
import "@/styles/main.css";
import Footer from "./layout/Footer";
import Topbar from "./layout/Topbar";
import { Suspense } from "react";

export const metadata = {
  title: "32Mobiles.com",
  description: "Generated by create next app",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <ThemeRegistry>
        <Suspense fallback={<loading />}>
          <body>
            <Topbar />
            {children}
            <Footer />
          </body>
        </Suspense>
      </ThemeRegistry>
    </html>
  );
}
