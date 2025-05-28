import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Car, Order } from '../types/types';
import { useReservationStore } from '@/stores/reservationStore';
import StartDatePicker from './StartDatePicker';

interface ReservationFormProps {
  car: Car;
  onSubmitted: (order: Order) => void;
}

type FormData = {
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  startDate: string;
  rentalDays: number;
};

const ReservationForm: React.FC<ReservationFormProps> = ({
  car,
  onSubmitted,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      rentalDays: 1,
    },
  });

  const { forms, setForm, clearForm, setOrderId } = useReservationStore();
  const saved = forms[car.vin];
  const rentalDays = watch('rentalDays') || 1;
  const totalPrice = car.pricePerDay * rentalDays;

  useEffect(() => {
    const saved = localStorage.getItem(`reservation_${car.vin}`);
    if (saved) {
      const values = JSON.parse(saved);
      Object.keys(values).forEach((key) => {
        setValue(key as keyof FormData, values[key]);
      });
    }
  }, [car.vin, setValue]);

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(`reservation_${car.vin}`, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch, car.vin]);

  const onSubmit = async (data: FormData) => {
    const order: Order = {
      ...data,
      vin: car.vin,
      status: 'pending',
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    const result = await res.json();

    if (res.ok && result.orderId) {
      localStorage.removeItem(`reservation_${car.vin}`);
      setOrderId(result.orderId);
      onSubmitted(order);
    } else {
      alert('Failed to submit order.');
    }
  };

  const handleCancel = () => {
    localStorage.removeItem(`reservation_${car.vin}`);
    reset();
    window.location.href = '/';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold text-sky-800">
        Reserve - {car.brand} {car.carModel}
      </h2>

      <input
        className="w-full p-2 border rounded"
        {...register('name', { required: true })}
        placeholder="Your name"
      />
      {errors.name && <span className="text-red-500">Name is required</span>}

      <input
        className="w-full p-2 border rounded"
        {...register('phone', { required: true })}
        placeholder="Phone number"
      />
      {errors.phone && <span className="text-red-500">Phone is required</span>}
      <div>
        <input
          className="w-full p-2 border rounded"
          type="email"
          {...register('email', { required: true })}
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
      </div>
      <div>
        <input
          className="w-full p-2 border rounded"
          {...register('licenseNumber', { required: true })}
          placeholder="Driver's license number"
        />
        {errors.licenseNumber && (
          <p className="text-red-500">License number is required</p>
        )}
      </div>
      <div>
        <StartDatePicker name="startDate" control={control} />
        {errors.startDate && (
          <p className="text-red-500">Start date is required</p>
        )}
      </div>

      <input
        type="number"
        className="w-full p-2 border rounded"
        min={1}
        {...register('rentalDays', { required: true, min: 1 })}
        placeholder="Rental days"
      />
      {errors.rentalDays && (
        <span className="text-red-500">Rental days must be at least 1</span>
      )}

      <p className="text-xl border-t pt-2">
        Total Price: <strong>${totalPrice}</strong>
      </p>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
