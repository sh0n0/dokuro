import { trpc } from "@/client/lib/trpc";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";

export function Index() {
  const navigate = useNavigate();
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
        <div key={error.timestamp} className="m-8">
          <Card
            onClick={() =>
              navigate({
                to: "/errors/$id",
                params: { id: error.id.toString() },
              })
            }
            className="cursor-pointer transition-colors hover:bg-gray-200"
          >
            <CardContent>
              <p>{error.value}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
