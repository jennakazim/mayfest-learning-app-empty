import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
export const metadata: Metadata = {
  title: "Spotify Stats",
  description: "View your personal Spotify statistics and insights.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="mb-8 rounded-full bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center">
                  <Image
                    src="https://developer.spotify.com/images/guidelines/design/icon1.svg"
                    alt="Spotify Stats Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <span className="text-xl font-semibold text-gray-800">
                    Statsify
                  </span>
                </Link>
                <div className="flex items-center space-x-4">
                  {session ? (
                    <>
                      <Link href="/top-artists">
                        <Button variant="ghost">Top Artists</Button>
                      </Link>
                      <Link href="/top-tracks">
                        <Button variant="ghost">Top Tracks</Button>
                      </Link>
                      <Link href="/recently-played">
                        <Button variant="ghost">Recently Played</Button>
                      </Link>
                      <Link href="/api/auth/signout">
                        <Button variant="outline">Sign out</Button>
                      </Link>
                    </>
                  ) : (
                    <Link href="/login">
                      <Button className="bg-green-500 text-white hover:bg-green-600">
                        Sign in
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
