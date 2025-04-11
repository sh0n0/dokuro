import Markdown from "react-markdown";
import { Separator } from "../components/ui/separator";
import { trpc } from "../lib/trpc";

type ErrorDetailProps = {
  id: number;
};

export function ErrorDetail({ id }: ErrorDetailProps) {
  const { data: terminalError } = trpc.terminalErrors.findDetail.useQuery({
    id,
  });

  if (!terminalError) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-4 font-bold text-xl">Error</div>
      <div className="p-8">
        <Markdown>{terminalError.value}</Markdown>
      </div>
      <Separator className="my-4" />
      <div className="p-4 font-bold text-xl">Explanation</div>
      <div className="p-8">
        <Markdown>{terminalError.explanation}</Markdown>
      </div>
      <Separator className="my-4" />
      <div className="p-4 font-bold text-xl">Solution</div>
      <div className="p-8">
        <Markdown>{terminalError.solution}</Markdown>
      </div>
    </div>
  );
}
