import { createContext, useContext } from "react";

import { useProgress } from "@/hooks/useProgress";

type ProgressContextValue = ReturnType<typeof useProgress>;

export const ProgressContext = createContext<ProgressContextValue | null>(null);

export function useProgressContext(): ProgressContextValue {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgressContext must be used within ProgressProvider");
  }
  return value;
}
