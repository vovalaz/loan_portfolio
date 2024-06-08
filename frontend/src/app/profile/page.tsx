import Header from "../_components/header";
import { columns } from "./_components/columns";
import { CreditsDataTable } from "./_components/credits-data-table";

import { creditService } from "~/services/creditService";

import { getServerAuthSession } from "~/server/auth";

export default async function ProfilePage() {
  const session = await getServerAuthSession();
  const credits = await creditService.getAll(session!.user.token);

  return (
    <>
      <Header />
      <div className="flex w-full flex-col p-4">
        <div className="max-w-[1000px] p-4">
          <CreditsDataTable columns={columns} data={credits} />
        </div>
      </div>
    </>
  );
}
