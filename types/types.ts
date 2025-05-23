export interface Car {
  vin: string;
  brand: string;
  carModel: string;
  carType: string;
  image: string;
  year: number;
  mileage: number;
  fuelType: string;
  pricePerDay: number;
  available: boolean;
  description?: string;
}

export interface Order {
  vin: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  startDate: string;
  rentalDays: number;
  status: 'pending' | 'confirmed';
}
