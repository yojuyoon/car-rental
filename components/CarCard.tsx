import { useLastCarStore } from '@/stores/lastCarStore';
import { Car } from '@/types/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CarCard = ({ car }: { car: Car }) => {
  const router = useRouter();
  const setLastVin = useLastCarStore((state) => state.setLastVin);

  const handleRentClick = () => {
    if (car.available) {
      setLastVin(car.vin);
      router.push(`/reservation/${car.vin}`);
    }
  };

  return (
    <div className="border rounded p-4 shadow">
      <Image
        src={car.image}
        alt={car.carModel}
        width={300}
        height={200}
        className="w-full h-40 mb-2 object-cover"
      />
      <h3 className="text-xl font-bold">
        {car.brand} {car.carModel}
      </h3>
      <p className="text-gray-700">{car.carType}</p>
      <p className="text-gray-700">
        {car.mileage} km - {car.fuelType}
      </p>
      <p className="font-bold text-gray-900 text-xl py-2">
        ${car.pricePerDay}{' '}
        <span className="text-gray-700 font-normal">/ day</span>
      </p>
      <div className="flex justify-between items-center">
        <button
          onClick={handleRentClick}
          disabled={!car.available}
          className={
            car.available
              ? 'bg-sky-700 text-white font-semibold px-4 py-2 rounded cursor-pointer my-2'
              : 'bg-gray-400 text-white font-semibold px-4 py-2 rounded my-2 cursor-not-allowed'
          }
        >
          {car.available ? 'Rent' : 'Not Available'}
        </button>

        <p
          className={
            car.available
              ? 'text-green-800 bg-green-100 px-1 rounded w-max'
              : 'text-red-500 bg-red-100 px-1 rounded w-max text-center'
          }
        >
          {car.available ? 'Available' : 'Not Available'}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
