import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShopCard from './components/ShopCard';
import { Search } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface Shop {
  id: number;
  name: string;
  pricePerKg: number;
  image: string;
  location: Location;
  vegetables: string[];
}

function App() {
  const [shops] = useState<Shop[]>([
    {
      id: 1,
      name: "VENKAT VEGGES",
      pricePerKg: 60,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8437,
        lng: 77.6594,
        address: "Electronics City Phase 1, Near Infosys Gate 1, Bangalore"
      },
      vegetables: ["Tomatoes", "Onions", "Potatoes", "Carrots", "Beans", "Cabbage"]
    },
    {
      id: 2,
      name: "RAMU VEGGES",
      pricePerKg: 75,
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8456,
        lng: 77.6612,
        address: "Electronics City Phase 2, Near Wipro Gate, Bangalore"
      },
      vegetables: ["Tomatoes", "Onions", "Potatoes", "Cauliflower", "Spinach", "Cucumber"]
    },
    {
      id: 3,
      name: "SHILPA VEGGES",
      pricePerKg: 65,
      image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8484,
        lng: 77.6571,
        address: "Electronics City Phase 1, Near BHEL, Bangalore"
      },
      vegetables: ["Tomatoes", "Onions", "Potatoes", "Broccoli", "Peas", "Bell Peppers"]
    },
    {
      id: 4,
      name: "ROSHAN VEGGES",
      pricePerKg: 55,
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8401,
        lng: 77.6637,
        address: "Electronics City Phase 2, Near Siemens, Bangalore"
      },
      vegetables: ["Tomatoes", "Onions", "Potatoes", "Lady Finger", "Eggplant", "Green Chillies"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleGetDirections = (location: Location) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${location.lat},${location.lng}`;
        window.open(url, '_blank');
      }, (error) => {
        console.error("Error getting location:", error);
        // Fallback to just showing the destination
        const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
        window.open(url, '_blank');
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const averagePrice = Math.round(shops.reduce((acc, shop) => acc + shop.pricePerKg, 0) / shops.length);

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.vegetables.some(veg => veg.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar averagePrice={averagePrice} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="py-8">
          <div className="relative max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search shops or vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                name={shop.name}
                pricePerKg={shop.pricePerKg}
                image={shop.image}
                location={shop.location}
                vegetables={shop.vegetables}
                onGetDirections={() => handleGetDirections(shop.location)}
                averagePrice={averagePrice}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;