// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-gray-100 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Info */}
        <div className="space-y-4 col-span-2">
          <Link href="/">
            <Image
              src="/logo_white.svg"
              alt="drive today Logo"
              width={160}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <p className="text-sm font-light text-gray-200">
            Drive today is a car rental service that provides affordable and
            reliable transportation options to our customers.
          </p>
          <p className="text-sm">
            <span className="text-sky-400 font-medium">
              hannahyoon1121@gmail.com
            </span>
          </p>
        </div>

        {/* Helps */}
        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/reservation">Reservation</Link>
            </li>
            <li>
              <Link href="#">Terms & Condition</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>Jiyoung Yoon(25162862) © 2025. All Rights Reserved</p>
      </div>
    </footer>
  );
}
