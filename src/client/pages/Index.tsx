import { trpc } from "@/client/lib/trpc";
import { Link } from "@tanstack/react-router";
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
        <div key={error.timestamp}>
          {error.value}
          <br />
          <Link to={"/errors/$id"} params={{ id: error.id.toString() }}>
            <span className="hover:underline">details</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
