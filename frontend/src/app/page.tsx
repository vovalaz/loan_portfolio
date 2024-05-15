"use client";

import { creditService } from "~/services/creditService";
import ConfirmLoanDialog from "./_components/confirm-loan-dialog";
// import { api } from "~/trpc/server";
// import { getServerAuthSession } from "~/server/auth";
import Header from "./_components/header";
import LoanCalculatorForm, {
  type FormSchema,
} from "./_components/loan-calculator-form";
import { useEffect, useState } from "react";
import type { Credit, CreditType } from "~/types";
import { creditTypeService } from "~/services/creditTypeService";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [creditTypes, setCreditTypes] = useState<CreditType[]>([]);
  const [credit, setCredit] = useState<Credit | null>(null);

  useEffect(() => {
    const fetchCreditTypes = async () => {
      const creditTypesResult = await creditTypeService.getAll();
      setCreditTypes(creditTypesResult);
    };

    void fetchCreditTypes();
  }, []);

  const onSubmit = async (values: FormSchema) => {
    // setShowDialog(true);
    const monthsSum = values.months.reduce((acc, curr) => acc + curr, 0);
    if (monthsSum >= values.amount) {
      return;
    }

    const creditResult = await creditService.createCredit({
      amount: values.amount,
      term_months: values.term,
      payments: values.months,
      credit_type: values.type,
      purpose: "",
    });

    setCredit(creditResult);
  };

  const onDialogConfirm = () => {
    console.log("Confirm");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold">Loan portfolio</div>
        <LoanCalculatorForm onSubmit={onSubmit} creditTypes={creditTypes} />
        <ConfirmLoanDialog
          credit={credit}
          open={showDialog}
          onOpenChange={setShowDialog}
          onDialogConfirm={onDialogConfirm}
        />
      </div>
    </>
  );
}
