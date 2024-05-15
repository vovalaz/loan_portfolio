"use client";

import ConfirmLoanDialog from "./_components/confirm-loan-dialog";
// import { api } from "~/trpc/server";
// import { getServerAuthSession } from "~/server/auth";
import Header from "./_components/header";
import LoanCalculatorForm, {
  type FormSchema,
} from "./_components/loan-calculator-form";
import { useState } from "react";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = (values: FormSchema) => {
    console.log(values);
    setShowDialog(true);
    // const monthsSum = values.months.reduce((acc, curr) => acc + curr, 0);
    // if (monthsSum >= values.amount) {
    //   console.log("Error");
    // }
    // console.log(values);
  };

  const onDialogConfirm = () => {
    console.log("Confirm");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold">Loan portfolio</div>
        <LoanCalculatorForm onSubmit={onSubmit} />
        <ConfirmLoanDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          onDialogConfirm={onDialogConfirm}
        />
      </div>
    </>
  );
}
