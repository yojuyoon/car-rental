'use client';

import Image from 'next/image';

export default function Banner({ handleScroll }: { handleScroll: () => void }) {
  return (
    <section className="bg-blue-50 w-full">
      <div className="max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between py-12 md:py-20 mx-auto">
        {/* Left: Text + Buttons */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-sky-900 leading-tight mb-4">
            Explore the freedom <br />
            of car rental with{' '}
            <span className="text-orange-500">DriveToday.</span>
          </h1>
          <p className="text-gray-700 mb-6">
            Whether you&apos;re planning a road trip, need a reliable vehicle
            for a business trip, or just want the convenience of having a car at
            your disposal, we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              onClick={handleScroll}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shadow"
            >
              Get your car today
            </button>
          </div>
        </div>

        {/* Right: Car Image */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <Image
            src="/HeroPic4.png" // 이미지 파일은 public/banner-car.png로 저장
            alt="Red Car"
            width={500}
            height={300}
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
