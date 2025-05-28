import Link from 'next/link';

export default function Nav() {
  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-2 px-6 max-w-7xl">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="Car Rental Logo"
            className="h-13 cursor-pointer"
          />
        </Link>
        <Link href="/reservation">
          <button className="bg-sky-700 text-white font-semibold px-4 py-2 rounded">
            Reservation
          </button>
        </Link>
      </div>
    </header>
  );
}
