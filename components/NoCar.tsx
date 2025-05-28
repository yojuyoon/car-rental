import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function NoCar() {
  return (
    <div className="max-w-2xl mx-auto mt-12 text-center flex flex-col items-center justify-center py-24">
      <ExclamationTriangleIcon className="w-12 h-12 text-gray-400" />
      <h2 className="text-xl font-semibold text-gray-700">No car selected</h2>
      <p className="text-gray-600">
        Please choose a car on the homepage first.
      </p>
      <Link href="/">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shado mt-10">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}

export default NoCar;
