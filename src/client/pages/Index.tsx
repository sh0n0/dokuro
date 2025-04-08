import { useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { useFileWatcher } from "../hooks/useFileWatcher";
import { trpc } from "../lib/trpc";

export function Index() {
  const navigate = useNavigate();
  const { data } = trpc.terminalErrors.getList.useQuery();
  const { terminalErrors, setTerminalErrors, isLoading } = useFileWatcher();

  useEffect(() => {
    if (data) {
      setTerminalErrors(data);
    }
  }, [data, setTerminalErrors]);

  return (
    <div className="mt-4 flex flex-col">
      {isLoading && (
        <div className="m-4 flex items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}

      {terminalErrors.map((error) => (
        <div key={error.timestamp} className="mx-8 my-4">
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
