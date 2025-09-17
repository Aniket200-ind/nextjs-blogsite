import type { Metadata } from "next";
import { Fira_Code, Montserrat, Roboto, Merriweather } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";
import { Navbar } from "@/components/Navbar";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevPulse | Unofficial dev.to😅",
  description: "Created to understand the working of dev.to API's",
  keywords: ["dev.to", "devpulse"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} ${montserrat.variable} ${merriweather.variable} ${roboto.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen bg-theme-bg">
            {children}
          </main>
          </ThemeProvider>
      </body>
    </html>
  );
}
