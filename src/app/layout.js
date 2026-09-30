/**
 * Blaine County Sheriff Office Web Platform
 * Developed by Luzzysxdd
 * GitHub: https://github.com/Luzzysxdd
 * 
 * Copyright (c) 2026 Luzzysxdd. All rights reserved.
 */

import "./globals.css";

export const metadata = {
  title: "Blaine County Sheriff Office | Protect and Serve",
  description:
    "Blaine County Sheriff Office resmi web sitesi. Departman birimleri, personel kadrosu, başvuru ve duyurular hakkında bilgi alın.",
  keywords: ["BCSO", "Sheriff", "Blaine County", "Law Enforcement"],
  authors: [{ name: "Luzzysxdd", url: "https://github.com/Luzzysxdd" }],
  creator: "Luzzysxdd",
  publisher: "Luzzysxdd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
