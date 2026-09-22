"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

function isTvScreen(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === "/ekran" || pathname.startsWith("/ekran/");
}

/**
 * Web sitesi chrome'u — /ekran (Smart TV panosu) için Header/Footer yok.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tv = isTvScreen(pathname);

  if (tv) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="w-full max-w-full flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
