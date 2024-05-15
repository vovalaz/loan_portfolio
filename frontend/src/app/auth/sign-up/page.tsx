import Header from "../../_components/header";
import SignUpForm from "./_components/sign-up-form";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex max-w-[300px] flex-col gap-4 p-4">
          <div>Sign Up</div>
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
