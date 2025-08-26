"use client";

import { Suspense } from "react";
import EditPrompt from '@components/EditPrompt';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
}
