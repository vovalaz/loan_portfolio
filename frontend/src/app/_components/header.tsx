"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex flex-row items-center justify-between p-4">
      <Link href="/">Loan Portfolio</Link>
      <nav className="flex flex-row gap-4">
        {session?.user && <Link href="/profile">Profile</Link>}
      </nav>
    </header>
  );
}
