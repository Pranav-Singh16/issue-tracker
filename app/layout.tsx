import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css"; // or wherever your global styles are
import { Inter } from "next/font/google";
import { Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";

// ✅ Initialize the font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Issue Tracker",
  description:
    "An issue tracker app where you can create, monitor, resolve, and close issues.",
  icons: {
    icon: [
      {
        url: "/metabug.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme>
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
