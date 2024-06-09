"use client";

import Header from "../_components/header";
import { getColumns } from "./_components/columns";
import { CreditsDataTable } from "./_components/credits-data-table";

import { useCreditService } from "~/hooks/useCreditService";
import { useSession } from "next-auth/react";
import PaymentsDialog from "./_components/payments-dialog";
import { useEffect, useState } from "react";
import type { Credit } from "~/types";

export default function ProfilePage() {
  const session = useSession();
  const { useGetAllCredits, useApproveCredit, useRejectCredit } =
    useCreditService();
  const {
    data: credits,
    isLoading,
    isFetching,
  } = useGetAllCredits(session.data?.user.token);

  const approveCredit = useApproveCredit();
  const rejectCredit = useRejectCredit();

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
  useEffect(() => {
    if (!paymentDialogOpen) {
      setSelectedCredit(null);
    }
  }, [paymentDialogOpen]);

  const columns = getColumns({
    async onApproveClick(credit) {
      await approveCredit.mutateAsync({
        id: credit.id,
        token: session.data!.user.token,
      });
    },
    async onRejectClick(credit) {
      await rejectCredit.mutateAsync({
        id: credit.id,
        token: session.data!.user.token,
      });
    },
    isAdmin: session.data?.user.isStaff ?? false,
    onViewPaymentDetailsClick: (credit) => {
      setSelectedCredit(credit);
      setPaymentDialogOpen(true);
    },
  });

  const name = session.data?.user.firstName;

  return (
    <>
      <Header />
      <div className="flex w-full flex-col p-4">
        <div>
          Welcome {name?.length === 0 ? session.data?.user.email : name}
        </div>
        <div className=" p-4">
          <CreditsDataTable
            columns={columns}
            data={credits ?? []}
            isLoading={isLoading || isFetching}
          />
        </div>
        <PaymentsDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          credit={selectedCredit}
        />
      </div>
    </>
  );
}
