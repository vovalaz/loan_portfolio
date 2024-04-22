"use client";

// import { api } from "~/trpc/server";
// import { getServerAuthSession } from "~/server/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Header from "./_components/header";
import LoanCalculatorForm from "./_components/loan-calculator-form";

export default function Home() {
  const { data: session } = useSession();

  // const handleSignOut = async () => {
  //   await signOut();
  // };

  // const handleSignIn = async () => {
  //   await signIn();
  // };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div>Loan portfolio</div>
        <LoanCalculatorForm />
      </div>
    </>
  );
}
