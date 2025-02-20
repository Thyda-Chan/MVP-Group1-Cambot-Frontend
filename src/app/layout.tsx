import "./globals.css";
import { ReactNode } from "react";
import favicon from "@/public/Assets_Images/image.png"; // Import image

export const metadata = {
  title: "CamBot",
  icons: {
    icon: favicon.src, // Use imported image source
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href={favicon.src} sizes="any" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
