'use client';

import { useEffect, useRef, useState } from 'react';
import { Car } from '../types/types';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CarGrid from '../components/CarGrid';
import Banner from '@/components/Banner';
import Loading from '@/components/Loading';

const HomePage = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [keyword, setKeyword] = useState('');
  const [brand, setBrand] = useState('');
  const [carType, setCarType] = useState('');

  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setIsLoading(false);
        setFilteredCars(data);
      })
      .catch((err) => {
        console.error('Failed to load cars:', err);
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

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-auto py-8">
      <Banner handleScroll={handleScroll} />
      <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-2xl text-sky-700 font-bold mb-4">Available Cars</h1>
        <SearchBar keyword={keyword} onKeywordChange={setKeyword} cars={cars} />
        <FilterPanel
          brand={brand}
          carType={carType}
          onBrandChange={setBrand}
          onTypeChange={setCarType}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <CarGrid ref={targetRef} cars={filteredCars} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
