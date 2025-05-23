import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ReservationFormState = {
  [vin: string]: {
    name: string;
    phone: string;
    email: string;
    licenseNumber: string;
    startDate: string;
    rentalDays: number;
  };
};

interface ReservationStore {
  forms: ReservationFormState;
  setForm: (vin: string, form: ReservationFormState[string]) => void;
  clearForm: (vin: string) => void;
}

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      forms: {},
      setForm: (vin, form) =>
        set((state) => ({
          forms: {
            ...state.forms,
            [vin]: form,
          },
        })),
      clearForm: (vin) =>
        set((state) => {
          const updated = { ...state.forms };
          delete updated[vin];
          return { forms: updated };
        }),
    }),
    {
      name: 'reservation-form-storage',
    }
  )
);
