import "@radix-ui/themes/styles.css";
import "./globals.css"; // or wherever your global styles are
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";

// ✅ Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "A Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <NavBar />
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
