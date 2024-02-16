"use client";

import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from "recoil";

export default function NextuiProviderSet({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NextUIProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </NextUIProvider>
    </div>
  );
}
