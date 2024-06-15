"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function MenuLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      className={`w-full flex py-1 font-semibold hover:underline ${
        pathname === href && "underline"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
