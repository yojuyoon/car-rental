'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between bg-white py-12 md:py-20 max-w-7xl mx-auto">
      {/* Left: Text + Buttons */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-sky-900 leading-tight mb-4">
          Explore the freedom <br />
          of car rental with <span className="text-orange-500">Drivewise.</span>
        </h1>
        <p className="text-gray-700 mb-6">
          Whether you're planning a road trip, need a reliable vehicle for a
          business trip, or just want the convenience of having a car at your
          disposal, we’ve got you covered.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
          <Link href="/reservation">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shadow">
              Get your car today
            </button>
          </Link>
          <Link href="#car-grid">
            <span className="text-sky-700 hover:underline font-medium flex items-center">
              See all cars →
            </span>
          </Link>
        </div>
      </div>

      {/* Right: Car Image */}
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <Image
          src="/HeroPic.png" // 이미지 파일은 public/banner-car.png로 저장
          alt="Red Car"
          width={500}
          height={300}
          className="object-contain drop-shadow-xl"
        />
      </div>
    </section>
  );
}
