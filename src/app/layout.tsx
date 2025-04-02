import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "8ball pool tracker",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}  
      </body>
    </html>
  );
}
