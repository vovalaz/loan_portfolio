"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export default function Header() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="flex flex-row items-center justify-between bg-gray-100 p-4">
      <div className="flex items-center gap-4">
        <Link className="text-lg font-bold" href="/">
          Loan Portfolio
        </Link>
        <Link href="/credits">Credits</Link>
      </div>
      <nav className="flex flex-row gap-4">
        {session?.user && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>
                    {session.user.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={handleSignOut}>Sign out</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Link href="/profile">Profile</Link> */}
          </>
        )}
        {!session?.user && <Button onClick={handleSignIn}>Sign in</Button>}
      </nav>
    </header>
  );
}
