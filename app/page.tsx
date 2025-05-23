'use client';

import { useEffect, useState } from 'react';
import { Car } from '../types/types';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CarGrid from '../components/CarGrid';
import Banner from '@/components/Banner';

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [keyword, setKeyword] = useState('');
  const [brand, setBrand] = useState('');
  const [carType, setCarType] = useState('');

  useEffect(() => {
    fetch('/data/cars.json')
      .then((res) => res.json())
      .then((data) => {
        setCars(data.cars);
        setFilteredCars(data.cars);
      });
  }, []);

  useEffect(() => {
    let result = [...cars];

    if (keyword.trim()) {
      const lower = keyword.toLowerCase();
      result = result.filter(
        (car) =>
          car.carType.toLowerCase().includes(lower) ||
          car.brand.toLowerCase().includes(lower) ||
          car.carModel.toLowerCase().includes(lower) ||
          car.description?.toLowerCase().includes(lower)
      );
    }

    if (brand) {
      result = result.filter((car) => car.brand === brand);
    }

    if (carType) {
      result = result.filter((car) => car.carType === carType);
    }

    setFilteredCars(result);
  }, [keyword, brand, carType, cars]);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Banner />
      <h1 className="text-2xl font-bold mb-4">Available Cars</h1>
      <SearchBar keyword={keyword} onKeywordChange={setKeyword} cars={cars} />
      <FilterPanel
        brand={brand}
        carType={carType}
        onBrandChange={setBrand}
        onTypeChange={setCarType}
      />
      <CarGrid cars={filteredCars} />
    </div>
  );
};

export default HomePage;
