"use client";

// import { api } from "~/trpc/server";
// import { getServerAuthSession } from "~/server/auth";
import Header from "./_components/header";
import LoanCalculatorForm from "./_components/loan-calculator-form";

export default function Home() {
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
