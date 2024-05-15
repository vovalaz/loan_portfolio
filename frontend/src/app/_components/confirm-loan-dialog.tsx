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

type ConfirmLoanDialogProps = {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  onDialogConfirm: () => void;
};

export default function ConfirmLoanDialog({
  open,
  onOpenChange,
  onDialogConfirm,
}: ConfirmLoanDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sell soul to the devil?</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col">
          <div>Extra amount</div>
          <div>Total</div>
          <div>Yearly percent</div>
          <div>Last month amount</div>
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
