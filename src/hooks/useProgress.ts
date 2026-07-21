import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

import type { UserProgress } from "@/types/quiz";

const STORAGE_KEY = "@idf_quiz_progress";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (mounted && raw) {
          setProgress(JSON.parse(raw) as UserProgress);
        }
      } catch {
        // Keep empty progress on read failure
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback(async (next: UserProgress) => {
    setProgress(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore write failures; UI still updates in-session
    }
  }, []);

  const markComplete = useCallback(
    async (itemId: string) => {
      if (progress[itemId]) return;
      await persist({ ...progress, [itemId]: true });
    },
    [persist, progress],
  );

  const isComplete = useCallback(
    (itemId: string) => Boolean(progress[itemId]),
    [progress],
  );

  const completedCount = Object.values(progress).filter(Boolean).length;

  return {
    progress,
    isLoading,
    markComplete,
    isComplete,
    completedCount,
  };
}
