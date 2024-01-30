"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function NextuiProviderSet({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  );
}
