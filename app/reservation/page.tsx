'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLastCarStore } from '@/stores/lastCarStore';

export default function ReservationIndexPage() {
  const router = useRouter();
  const lastVin = useLastCarStore((state) => state.lastVin);

  useEffect(() => {
    if (lastVin) {
      router.push(`/reservation/${lastVin}`);
    }
  }, [lastVin, router]);

  return (
    <div className="max-w-2xl mx-auto mt-12 text-center">
      <h2 className="text-xl font-semibold">No car selected</h2>
      <p className="text-gray-600">
        Please select a car from the homepage first to make a reservation.
      </p>
    </div>
  );
}
