import { ArrowLeft, MapPin, Users, DollarSign, Star, MessageCircle, Check } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VenueDetailProps {
  venue: any;
  onBack: () => void;
  onSelect: () => void;
}

export function VenueDetail({ venue, onBack, onSelect }: VenueDetailProps) {
  if (!venue) return null;

  const features = [
    '🎵 Музыкальное оборудование',
    '🍽️ Кейтеринг',
    '🅿️ Бесплатная парковка',
    '❄️ Кондиционер',
    '🎨 Декорации',
    '📸 Фотозона'
  ];

  const handleWhatsApp = () => {
    window.open(`https://wa.me/996555123456?text=Здравствуйте! Меня интересует площадка ${venue.name}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image header */}
      <div className="relative h-80">
        <ImageWithFallback
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
        >
          <ArrowLeft className="w-6 h-6 text-cyan-700" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Title and rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="mb-2 text-cyan-900">{venue.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{venue.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 rounded-xl px-3 py-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-amber-900">{venue.rating}</span>
          </div>
        </div>

        {/* Price and capacity */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-cyan-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-cyan-600 mb-1">
              <DollarSign className="w-5 h-5" />
              <span>Цена</span>
            </div>
            <p className="text-cyan-900">от {venue.price.toLocaleString()} сом</p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Users className="w-5 h-5" />
              <span>Вместимость</span>
            </div>
            <p className="text-cyan-900">до {venue.capacity} чел</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-3 text-cyan-900">Описание</h3>
          <p className="text-gray-600 leading-relaxed">
            {venue.description}. Идеальное место для проведения торжественных мероприятий, свадеб, корпоративов и других праздников. 
            Профессиональное обслуживание и современное оборудование обеспечат незабываемый праздник.
          </p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="mb-3 text-cyan-900">Удобства</h3>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-sky-50 rounded-xl p-3"
              >
                <Check className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini map */}
        <div className="mb-6">
          <h3 className="mb-3 text-cyan-900">Локация</h3>
          <div className="h-48 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <MapPin className="w-12 h-12 text-cyan-500" />
          </div>
        </div>
      </div>

      {/* Fixed bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 safe-area-inset-bottom">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            onClick={handleWhatsApp}
            variant="outline"
            className="flex-1 py-6 rounded-xl border-2 border-cyan-500 text-cyan-700 hover:bg-cyan-50"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Написать
          </Button>
          <Button
            onClick={onSelect}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 rounded-xl shadow-lg"
          >
            <Check className="w-5 h-5 mr-2" />
            Выбрать
          </Button>
        </div>
      </div>

      {/* Spacing for fixed footer */}
      <div className="h-24"></div>
    </div>
  );
}
