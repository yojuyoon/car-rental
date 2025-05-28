import { Car } from '@/types/types';
import CarCard from './CarCard';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function CarGrid({
  cars,
  ref,
}: {
  cars: Car[];
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.length > 0 ? (
        cars.map((car) => <CarCard key={car.vin} car={car} />)
      ) : (
        <div className="w-full text-gray-400">
          <ExclamationCircleIcon className="w-12 h-12" />
          No Data
        </div>
      )}
    </div>
  );
}
