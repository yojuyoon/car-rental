import { useForm } from 'react-hook-form';
import { Order } from '../types/types';
import { useReservationStore } from '@/stores/reservationStore';

interface OrderConfirmationProps {
  order: Order;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order }) => {
  const { orderId } = useReservationStore();
  const { handleSubmit } = useForm();

  const onConfirm = async () => {
    if (!orderId) {
      alert('No order ID found.');
      return;
    }

    const res = await fetch('/api/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });

    if (res.ok) {
      alert('Your order has been confirmed!');
    } else {
      alert('Failed to confirm order.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onConfirm)} className="space-y-4">
      <p>
        Your reservation for <strong>{order.vin}</strong> is pending.
      </p>
      <p>Please confirm to complete your booking:</p>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Confirm Order
      </button>
    </form>
  );
};

export default OrderConfirmation;
