import { useState } from 'react';
import { trpc, } from '@/lib/trpc';
import type { Change } from 'diff';

export function Index() {
  const [differences, setDifferences] = useState<Change[]>([]);
  
    trpc.fileWatcher.watchFile.useSubscription(
      undefined,
      {
        onData: (data) => {
          setDifferences(data.differences);
        },
        onError: (err) => {
          console.error('Subscription error:', err);
        },
      }
    );
  
  return (
    <div>
      {differences.at(0)?.value}
    </div>
  );
};