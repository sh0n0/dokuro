import { trpc } from "@/client/lib/trpc";
import { useState } from "react";

export function useFileWatcher() {
  const [terminalErrors, setTerminalErrors] = useState<TerminalError[]>([]);
  const [waitingErrors, setWaitingErrors] = useState<number[]>([]);

  trpc.fileWatcher.watchFile.useSubscription(undefined, {
    onData: (data) => {
      switch (data.type) {
        case "loading":
          setWaitingErrors((prev) => [data.id, ...prev]);
          break;
        case "terminal_error":
          setWaitingErrors((prev) => prev.filter((id) => id !== data.id));
          setTerminalErrors((prev) => [data, ...prev]);
          break;
      }
    },
    onError: (err) => {
      console.error("Subscription error:", err);
    },
  });

  const isLoading = waitingErrors.length > 0;

  return {
    terminalErrors,
    setTerminalErrors,
    isLoading,
  };
}
