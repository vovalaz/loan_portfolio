"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import type { Credit } from "~/types";

type ConfirmLoanDialogProps = {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  onDialogConfirm: () => void;
  credit: Credit | null;
};

export default function ConfirmLoanDialog({
  open,
  onOpenChange,
  onDialogConfirm,
  credit,
}: ConfirmLoanDialogProps) {
  const total = (credit?.general_expenses ?? 0) + (credit?.amount ?? 0);
  const lastMonthAmount =
    credit?.payments?.[credit.payments.length - 1]?.amount;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sell soul to the devil?</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col">
          <div>Total {total}</div>
          <div>Extra amount {credit?.general_expenses}</div>
          <div>Yearly percent {credit?.annual_rate}</div>
          <div>Last month amount {lastMonthAmount}</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDialogConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
