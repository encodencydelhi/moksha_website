import "./globals.css";
import Script from "next/script";
import Sideicon from "@/components/Sideicon/Sideicon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </head>
      <body suppressHydrationWarning>

        {children}
      </body>
    </html>
  );
}
