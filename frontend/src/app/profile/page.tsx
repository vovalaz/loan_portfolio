import { getServerAuthSession } from "~/server/auth";
import Header from "../_components/header";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  return (
    <>
      <Header />
      <div className="flex flex-row gap-4 p-4">
        <div>Profile</div>
        <div>Welcome: {session?.user.email}</div>
      </div>
    </>
  );
}
