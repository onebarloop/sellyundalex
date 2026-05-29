'use client';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  action: () => void;
}

export default function Button({ action, children }: Props) {
  return <button onClick={action}>{children}</button>;
}
