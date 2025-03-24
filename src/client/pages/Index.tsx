import { trpc } from "@/client/lib/trpc";
import { useState } from "react";

export function Index() {
  const [terminalErrors, setTerminalErrors] = useState<TerminalError[]>([]);

  trpc.fileWatcher.watchFile.useSubscription(undefined, {
    onData: (data) => {
      setTerminalErrors((prev) => [...prev, data]);
    },
    onError: (err) => {
      console.error("Subscription error:", err);
    },
  });

  return (
    <div>
      {terminalErrors.map((error) => (
        <div key={error.timestamp}>{error.value}</div>
      ))}
    </div>
  );
}
