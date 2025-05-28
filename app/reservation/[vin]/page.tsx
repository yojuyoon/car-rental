'use client';
import { use } from 'react';
import { useEffect, useState } from 'react';
import { Car, Order } from '../../../types/types';
import ReservationForm from '../../../components/ReservationForm';
import OrderConfirmation from '../../../components/OrderConfirmation';
import 'react-datepicker/dist/react-datepicker.css';
import NoCar from '@/components/NoCar';

export default function ReservationPage({
  params,
}: {
  params: Promise<{ vin: string }>;
}) {
  const { vin } = use(params);

  const [car, setCar] = useState<Car | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vin) return;

    fetch('/data/cars.json')
      .then((res) => res.json())
      .then((data) => {
        const selected = data.cars.find((c: Car) => c.vin === vin);
        setCar(selected || null);
      })
      .finally(() => setLoading(false));
  }, [vin]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!car) {
    return <NoCar />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 pb-10 pt-16">
      <h2 className="text-2xl font-bold mb-4 text-sky-800">Reservation</h2>

      <div className="border rounded p-4 mb-6 bg-gray-50">
        <p>
          <strong>Brand:</strong> {car.brand}
        </p>
        <p>
          <strong>Model:</strong> {car.carModel}
        </p>
        <p>
          <strong>Type:</strong> {car.carType}
        </p>
        <p>
          <strong>Fuel:</strong> {car.fuelType}
        </p>
        <p>
          <strong>Price:</strong> ${car.pricePerDay} / day
        </p>
      </div>

      {!car.available ? (
        <div className="text-red-600 font-semibold">
          Sorry, this car is no longer available. Please choose another one.
        </div>
      ) : !order ? (
        <ReservationForm car={car} onSubmitted={(order) => setOrder(order)} />
      ) : (
        <OrderConfirmation order={order} />
      )}
    </div>
  );
}
