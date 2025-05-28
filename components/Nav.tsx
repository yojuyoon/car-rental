'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLastCarStore } from '@/stores/lastCarStore';

export default function Nav() {
  const lastVin = useLastCarStore((state) => state.lastVin);
  console.log(lastVin);
  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-2 px-6 max-w-7xl">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Car Rental Logo"
            width={150}
            height={52}
            className="cursor-pointer"
          />
        </Link>
        <Link href={lastVin ? `/reservation/${lastVin}` : '#car-list'}>
          <button className="bg-sky-700 text-white font-semibold px-4 py-2 rounded">
            Reservation
          </button>
        </Link>
      </div>
    </header>
  );
}
