"use client";

import { ModalProvider } from "@/contexts/modalContext";
import { UserProvider } from "@/contexts/userContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <UserProvider>{children}</UserProvider>
    </ModalProvider>
  );
}
