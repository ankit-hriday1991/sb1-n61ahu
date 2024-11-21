import React from 'react';
import { MapPin, Leaf } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface ShopCardProps {
  name: string;
  pricePerKg: number;
  image: string;
  location: Location;
  vegetables: string[];
  onGetDirections: () => void;
  averagePrice: number;
}

export default function ShopCard({ 
  name, 
  pricePerKg, 
  image, 
  location, 
  vegetables,
  onGetDirections,
  averagePrice
}: ShopCardProps) {
  const isPriceLower = pricePerKg < averagePrice;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {isPriceLower && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Best Price
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-green-600 font-medium mt-1 text-lg">₹{pricePerKg}/KG</p>
        
        <div className="mt-2 flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{location.address}</span>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Vegetables:</h4>
          <div className="flex flex-wrap gap-2">
            {vegetables.map((veg, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                <Leaf className="h-3 w-3 mr-1" />
                {veg}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onGetDirections}
          className="mt-4 w-full py-2 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Get Directions
        </button>
      </div>
    </div>
  );
}