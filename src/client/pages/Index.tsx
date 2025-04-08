import { useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { useFileWatcher } from "../hooks/useFileWatcher";

export function Index() {
  const navigate = useNavigate();
  const { terminalErrors, isLoading } = useFileWatcher();

  return (
    <div>
      {isLoading && (
        <div className="m-8 flex items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}

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
