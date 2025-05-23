interface FilterPanelProps {
  carType: string;
  brand: string;
  onTypeChange: (value: string) => void;
  onBrandChange: (value: string) => void;
}

export default function FilterPanel({
  carType,
  brand,
  onTypeChange,
  onBrandChange,
}: FilterPanelProps) {
  return (
    <div className="flex gap-4 mb-4">
      <select value={carType} onChange={(e) => onTypeChange(e.target.value)}>
        <option value="">All Types</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
      </select>

      <select value={brand} onChange={(e) => onBrandChange(e.target.value)}>
        <option value="">All Brands</option>
        <option value="Toyota">Toyota</option>
        <option value="Ford">Ford</option>
      </select>
    </div>
  );
}
