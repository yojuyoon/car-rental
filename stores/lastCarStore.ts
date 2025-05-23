import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LastCarState {
  lastVin: string | null;
  setLastVin: (vin: string) => void;
  clearLastVin: () => void;
}

export const useLastCarStore = create<LastCarState>()(
  persist(
    (set) => ({
      lastVin: null,
      setLastVin: (vin) => set({ lastVin: vin }),
      clearLastVin: () => set({ lastVin: null }),
    }),
    {
      name: 'last-car-storage', // localStorage 키 이름
    }
  )
);
