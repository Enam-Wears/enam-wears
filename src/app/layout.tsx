import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartDrawer } from "../components/cart-drawer";
import { CartProvider } from "../components/cart-provider";
import { SiteFooter } from "../components/footer";
import { SiteHeader } from "../components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Enam Wears",
    template: "%s | Enam Wears",
  },
  description:
    "Premium performance-inspired apparel designed for confidence in motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>

          <SiteHeader />

          <main id="main-content">{children}</main>

          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
