import { GeistSans } from "geist/font/sans";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="h-full w-full flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
                <Button
                  variant="link"
                  className="absolute left-4 top-4"
                  asChild
                >
                  <Link href="/">VibeVision</Link>
                </Button>
                <AuthButton />
              </div>
            </nav>
          </div>

          {children}
        </main>
      </body>
    </html>
  );
}
