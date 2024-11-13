"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { PropsWithChildren, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import type { AppStore } from "@/stores";
import { makeStore } from "@/stores";

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
