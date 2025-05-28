'use client';

import { Listbox } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  FunnelIcon,
} from '@heroicons/react/20/solid';

interface FilterPanelProps {
  carType: string;
  brand: string;
  onTypeChange: (value: string) => void;
  onBrandChange: (value: string) => void;
}

const carTypes = [
  'All Types',
  'Sedan',
  'SUV',
  'Coupe',
  'Hatchback',
  'Wagon',
  'Electric',
];
const brands = [
  'All Brands',
  'Toyota',
  'Ford',
  'Honda',
  'Hyundai',
  'Subaru',
  'Tesla',
];

export default function FilterPanel({
  carType,
  brand,
  onTypeChange,
  onBrandChange,
}: FilterPanelProps) {
  const display = (val: string, all: string) => (val === '' ? all : val);

  return (
    <div className="flex flex-col justify-end md:flex-row gap-4 mb-6">
      {/* Car Type */}
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <FunnelIcon className="h-5 w-5 text-gray-600" />
        <span>Filters</span>
      </div>
      <div className="w-full md:w-[150px]">
        <Listbox
          value={carType}
          onChange={(val) => onTypeChange(val === 'All Types' ? '' : val)}
        >
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
              <span className="block truncate">
                {display(carType, 'All Types')}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow ring-1 ring-black/5">
              {carTypes.map((type, idx) => (
                <Listbox.Option
                  key={idx}
                  value={type}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {type}
                      </span>
                      {selected ? (
                        <span className="absolute left-2 top-2 text-sky-600">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Brand */}
      <div className="w-full md:w-[150px]">
        <Listbox
          value={brand}
          onChange={(val) => onBrandChange(val === 'All Brands' ? '' : val)}
        >
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
              <span className="block truncate">
                {display(brand, 'All Brands')}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow ring-1 ring-black/5">
              {brands.map((b, idx) => (
                <Listbox.Option
                  key={idx}
                  value={b}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {b}
                      </span>
                      {selected ? (
                        <span className="absolute left-2 top-2 text-sky-600">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
