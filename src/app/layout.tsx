"use client";

import Header from "../components/layouts/Header";
import "../../styles/globals.css";
import { ReactNode } from "react";
import { CategoryProvider } from "../context/CategoryContext";
import { LogDataProvider } from "../context/LogDataContext";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Expense Tracker",
//   description: "Track your expenses",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeaderPages = ["/"];

  return (
    <html lang="en">
      <head>
        <title>LOG27 - Expense Tracker</title>
        <meta
          name="description"
          content="Track your daily expenses with LOG27. Simplify your expense tracking with our intuitive expense tracker."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="expense tracker, budget, finance, money management"
        />
        <meta name="author" content="LOG27" />

        {/* Open Graph tags */}
        <meta property="og:title" content="LOG27 - Expense Tracker" />
        <meta
          property="og:description"
          content="Track your daily expenses with LOG27"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LOG27 - Expense Tracker" />
        <meta
          name="twitter:description"
          content="Track your daily expenses with LOG27"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className="min-h-screen flex flex-col flex-wrap">
        {!hideHeaderPages.includes(pathname) && <Header />}
        <main className={`${!hideHeaderPages.includes(pathname) ? "p-6" : ""}`}>
          <LogDataProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </LogDataProvider>
        </main>
      </body>
    </html>
  );
}
