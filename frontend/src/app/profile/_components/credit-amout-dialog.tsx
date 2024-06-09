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
import { Input } from "~/components/ui/input";

type CreditAmountDialogProps = {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  creditAmount: number;
  setCreditAmount: (amount: number) => void;
  handleConfirmClick: () => void;
};

export default function CreditAmountDialog({
  open,
  onOpenChange,
  creditAmount,
  setCreditAmount,
  handleConfirmClick,
}: CreditAmountDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter credit amount</AlertDialogTitle>
        </AlertDialogHeader>
        <Input
          value={creditAmount}
          onChange={(e) => setCreditAmount(parseInt(e.target.value, 10))}
          type="number"
        />
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirmClick}>
            Confirm
          </AlertDialogAction>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
