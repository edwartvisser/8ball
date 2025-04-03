import type { Metadata } from "next";
import Head from "next/head";
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
      <Head>
        <script
          src="https://unpkg.com/heroicons@2.0.18/dist/heroicons.min.js"
          defer
        ></script>
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
