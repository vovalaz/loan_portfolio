"use client";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import LoadingOverlay from "~/components/ui/loading-overlay";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <LoadingOverlay>{children}</LoadingOverlay>
      </SessionProvider>
    </TRPCReactProvider>
  );
}
