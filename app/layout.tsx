import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HackMatrix hackathon by nexus",
  description: "Experience a story frame by frame as you scroll",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
