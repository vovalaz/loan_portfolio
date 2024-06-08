"use client";

import Header from "../_components/header";
import { getColumns } from "./_components/columns";
import { CreditsDataTable } from "./_components/credits-data-table";

import { creditService } from "~/services/creditService";

import { getServerAuthSession } from "~/server/auth";
import { useCreditService } from "~/hooks/useCreditService";
import { useSession } from "next-auth/react";

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
      </div>
    </>
  );
}
