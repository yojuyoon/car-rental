import { Car } from '@/types/types';
import CarCard from './CarCard';

export default function CarGrid({ cars }: { cars: Car[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.vin} car={car} />
      ))}
    </div>
  );
}
