'use client';

import { Order } from '../types/types';

interface ThankYouProps {
  order: Order;
}

const ThankYou: React.FC<ThankYouProps> = ({ order }) => {
  return (
    <div className="space-y-4 text-center py-8">
      <h1 className="text-2xl font-bold text-green-600">
        Reservation Confirmed!
      </h1>
      <p>
        Thank you for reserving the <strong>{order.vin}</strong>.
      </p>
      <p>Your reservation details have been saved successfully.</p>
      <p>
        VIN: <strong>{order.vin}</strong>
      </p>
      <p>
        Start Date:{' '}
        <strong>{new Date(order.startDate).toLocaleDateString()}</strong> |
        Rental Days: <strong>{order.rentalDays}</strong>
      </p>
      <p className="text-lg mt-4 text-sky-800">
        We’ll contact you shortly with more information.
      </p>
    </div>
  );
};

export default ThankYou;
