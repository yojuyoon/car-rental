import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Car, Order } from '../types/types';
import { useReservationStore } from '@/stores/reservationStore';
import StartDatePicker from './StartDatePicker';
import { toast } from 'react-toastify';
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
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      rentalDays: 1,
    },
  });

  const { setOrderId } = useReservationStore();
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
      toast.success('Your reservation was submitted successfully!');
      localStorage.removeItem(`reservation_${car.vin}`);
      localStorage.removeItem('last-car-storage');
      setOrderId(result.orderId);
      onSubmitted(order);
    } else {
      toast.error('Failed to submit order.');
    }
  };

  const handleCancel = () => {
    localStorage.removeItem(`reservation_${car.vin}`);
    localStorage.removeItem('last-car-storage');
    reset();
    window.location.href = '/';
  };
  console.log(errors);
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
        {...register('phone', {
          required: 'Phone is required',
          pattern: {
            value: /^[0-9]{9,15}$/,
            message: 'Enter a valid phone number',
          },
        })}
        placeholder="Phone number"
      />
      {errors.phone && (
        <span className="text-red-500">{errors.phone.message}</span>
      )}
      <div>
        <input
          className="w-full p-2 border rounded"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          className="w-full p-2 border rounded"
          {...register('licenseNumber', {
            required: 'License number is required',
            minLength: {
              value: 5,
              message: 'Too short to be a license number',
            },
          })}
          placeholder="Driver's license number"
        />
        {errors.licenseNumber && (
          <p className="text-red-500">{errors.licenseNumber.message}</p>
        )}
      </div>
      <div>
        <StartDatePicker name="startDate" control={control} />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate.message}</p>
        )}
      </div>

      <input
        type="number"
        className="w-full p-2 border rounded"
        min={1}
        {...register('rentalDays', {
          required: 'Rental days is required',
          min: {
            value: 1,
            message: 'Rental days must be at least 1',
          },
        })}
        placeholder="Rental days"
      />
      {errors.rentalDays && (
        <span className="text-red-500">{errors.rentalDays.message}</span>
      )}
      {isValid && (
        <p className="text-xl border-t pt-2">
          Total Price: <strong>${totalPrice}</strong>
        </p>
      )}

      <div className="flex gap-4">
        <button
          disabled={!isValid}
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            isValid ? 'bg-sky-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
