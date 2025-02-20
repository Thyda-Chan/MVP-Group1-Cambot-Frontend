import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Cambot",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
