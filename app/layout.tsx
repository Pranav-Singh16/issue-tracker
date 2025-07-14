import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css"; // or wherever your global styles are
import { Inter } from "next/font/google";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";
import AuthProvider from "./auth/provider";
import QueryClientProvider from "@/QueryClientProvider";

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
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="violet">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
