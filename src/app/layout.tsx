import "./globals.css";
import { ReactNode } from "react";
import favicon from "@/public/Assets_Images/image.png"; // Import image
import { UploadProvider } from "./context/UploadContext";
import UserProvider from "./context/UserContext";

export const metadata = {
  title: "CamBot",
  icons: {
    icon: favicon.src,
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
      <body>
        <UserProvider>
          <UploadProvider>{children}</UploadProvider>
        </UserProvider>
      </body>
    </html>
  );
}
