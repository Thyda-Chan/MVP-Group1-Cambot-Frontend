import "./globals.css";
import { ReactNode } from "react";
import favicon from "@/public/Assets_Images/image.png";
import { UploadProvider } from "./context/UploadContext";
import UserProvider from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

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
        <link rel="icon" href={favicon.src} sizes="any" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <AuthProvider>
          <UserProvider>
            <UploadProvider>{children}</UploadProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
