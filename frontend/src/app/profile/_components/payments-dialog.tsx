"use client";

import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { useCreditService } from "~/hooks/useCreditService";
import type { Credit } from "~/types";

type PaymentsDialogProps = {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  credit: Credit | null;
};

export default function PaymentsDialog({
  onOpenChange,
  open,
  credit,
}: PaymentsDialogProps) {
  const session = useSession();
  const { useGetPayments } = useCreditService();

  const { data: payments } = useGetPayments(
    credit?.id,
    session.data?.user.token,
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Payment Details</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          {payments?.map((payment, index) => (
            <div key={index} className="flex justify-between">
              <div>{payment.deadline}</div>
              <div>{payment.amount}</div>
              {/* <div>{payment.status}</div> */}
            </div>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
