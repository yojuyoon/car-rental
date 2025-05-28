'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLastCarStore } from '@/stores/lastCarStore';
import NoCar from '@/components/NoCar';

export default function ReservationIndexPage() {
  const router = useRouter();
  const lastVin = useLastCarStore((state) => state.lastVin);

  useEffect(() => {
    if (lastVin) {
      router.push(`/reservation/${lastVin}`);
    }
  }, [lastVin, router]);

  return <NoCar />;
}
