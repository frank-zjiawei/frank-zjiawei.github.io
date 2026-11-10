'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Redirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);
  return (
    <p className="container-prose py-24 font-mono text-sm text-fg-dim">
      Redirecting…
    </p>
  );
}
