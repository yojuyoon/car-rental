import { useLastCarStore } from '@/stores/lastCarStore';
import { Car } from '@/types/types';
import Link from 'next/link';

const CarCard = ({ car }: { car: Car }) => {
  const setLastVin = useLastCarStore((state) => state.setLastVin);
  return (
    <div className="border rounded p-4 shadow">
      <img
        src={car.image}
        alt={car.carModel}
        className="w-full h-40 object-cover"
      />
      <h3 className="text-xl font-bold">
        {car.brand} {car.carModel}
      </h3>
      <p>
        {car.carType} - {car.year}
      </p>
      <p>
        {car.mileage} km - {car.fuelType}
      </p>
      <p>${car.pricePerDay} / day</p>
      {car.available ? (
        <Link
          href={`/reservation/${car.vin}`}
          onClick={() => setLastVin(car.vin)}
        >
          <button className="...">Rent</button>
        </Link>
      ) : (
        <span className="text-red-500">Not Available</span>
      )}
    </div>
  );
};

export default CarCard;
