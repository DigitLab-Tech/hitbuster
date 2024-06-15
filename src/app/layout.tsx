import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuLink from "@/components/MenuLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hitbuster",
  description: "Everything about movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-black text-white flex gap-3 pr-3 ${inter.className}`}
      >
        <div className="border-r min-w-[200px] min-h-screen py-6 px-3 border-[rgba(255,255,255,0.3)]">
          <ul>
            <li>
              <MenuLink href="/init">Init</MenuLink>
            </li>
            <li>
              <MenuLink href="/action-movies">Action Movies</MenuLink>
            </li>
            <li>
              <MenuLink href="/best-movie-actors">Best Movie Actors</MenuLink>
            </li>
            <li>
              <MenuLink href="/best-viewer">Best Viewer</MenuLink>
            </li>
            <li>
              <MenuLink href="/never-viewed-movies">
                Never Viewed Movies
              </MenuLink>
            </li>
            <li>
              <MenuLink href="/update-comments">Update Comments</MenuLink>
            </li>
          </ul>
        </div>
        {children}
      </body>
    </html>
  );
}
