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
      <p>{terminalError.value}</p>
      <p>{terminalError.explanation}</p>
      <p>{terminalError.solution}</p>
    </div>
  );
}
