import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Users, DollarSign, Star, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VenueListProps {
  onSelectVenue: (venue: any) => void;
  onBack: () => void;
}

export function VenueList({ onSelectVenue, onBack }: VenueListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const venues = [
    {
      id: 1,
      name: 'Ала-Тоо Plaza',
      capacity: 200,
      price: 50000,
      rating: 4.8,
      location: 'Бишкек, центр',
      image: 'https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbnQlMjBoYWxsfGVufDF8fHx8MTc2NDU4Mjc2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Элегантный зал для торжественных мероприятий'
    },
    {
      id: 2,
      name: 'Silk Road Hall',
      capacity: 150,
      price: 40000,
      rating: 4.9,
      location: 'Бишкек, Южная Магистраль',
      image: 'https://images.unsplash.com/photo-1762765685319-fdaf8d22085d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5xdWV0JTIwdmVudWUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ1ODI3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Современный банкетный зал с панорамными окнами'
    },
    {
      id: 3,
      name: 'Manas Garden',
      capacity: 300,
      price: 70000,
      rating: 4.7,
      location: 'Чуйская область',
      image: 'https://images.unsplash.com/photo-1762216444919-043cf813e4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwdmVudWV8ZW58MXx8fHwxNzY0NTIxMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Открытая площадка с видом на горы'
    },
    {
      id: 4,
      name: 'Royal Palace',
      capacity: 250,
      price: 60000,
      rating: 4.8,
      location: 'Бишкек, Ахунбаева',
      image: 'https://images.unsplash.com/photo-1729957385579-528ce50ffd94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWxscm9vbXxlbnwxfHx8fDE3NjQ1NDA4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Роскошный банкетный зал премиум класса'
    }
  ];

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-cyan-700" />
          </button>
          <h2 className="flex-1 text-cyan-900">Площадки</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-cyan-50 rounded-full"
          >
            <SlidersHorizontal className="w-6 h-6 text-cyan-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Поиск площадок..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-sky-50 rounded-xl space-y-3">
            <div className="flex gap-2 overflow-x-auto">
              <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
                💰 Цена
              </Button>
              <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
                👥 Вместимость
              </Button>
              <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
                📍 Локация
              </Button>
              <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
                ⭐ Рейтинг
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Map placeholder */}
      <div className="h-48 bg-gradient-to-br from-cyan-100 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-cyan-500 opacity-50" />
        </div>
        <div className="absolute bottom-4 left-4 bg-white rounded-full px-4 py-2 shadow-lg">
          <p className="text-cyan-900">Карта площадок</p>
        </div>
      </div>

      {/* Venue cards */}
      <div className="px-6 py-6 space-y-4">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            onClick={() => onSelectVenue(venue)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="h-48 relative">
              <ImageWithFallback
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-cyan-900">{venue.rating}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="mb-2 text-cyan-900">{venue.name}</h3>
              <p className="text-gray-600 mb-3">{venue.description}</p>
              
              <div className="flex items-center gap-4 text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{venue.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{venue.capacity}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-cyan-600">
                  <DollarSign className="w-5 h-5" />
                  <span>от {venue.price.toLocaleString()} сом</span>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl"
                >
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
