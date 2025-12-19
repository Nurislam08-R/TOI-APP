import { Sparkles, Calendar, MapPin, Wallet, User, Plus } from 'lucide-react';
import { EthnicPattern } from './EthnicPattern';
import { PromoBanner } from './PromoBanner';
import { Button } from './ui/button';
import { Event } from '../App';

interface HomeScreenProps {
  onCreateEvent: () => void;
  onMyEvents: () => void;
  onFindVenue: () => void;
  onNavigate: (screen: string) => void;
  events: Event[];
  user?: any;
}

export function HomeScreen({ onCreateEvent, onMyEvents, onFindVenue, onNavigate, events, user }: HomeScreenProps) {
  const recommendedVenues = [
    { name: 'Ала-Тоо Plaza', capacity: 200, price: 50000, rating: 4.8 },
    { name: 'Silk Road Hall', capacity: 150, price: 40000, rating: 4.9 },
    { name: 'Manas Garden', capacity: 300, price: 70000, rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with ethnic pattern */}
      <div className="bg-gradient-to-r from-primary to-[#3B6EA5] text-white pb-6">
        <div className="opacity-20">
          <EthnicPattern className="w-full h-16" />
        </div>
        <div className="px-6 -mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-white">Toi App</h1>
                <p className="text-[#A7D8F0]">
                  {user?.name ? `Привет, ${user.name}!` : 'Добро пожаловать!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main actions */}
      <div className="px-6 -mt-4">
        <div className="bg-card rounded-3xl shadow-lg p-6 space-y-3">
          <Button
            onClick={onCreateEvent}
            className="w-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white py-6 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Создать мероприятие
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onMyEvents}
              variant="outline"
              className="py-8 rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <div className="flex flex-col items-center">
                <Calendar className="w-6 h-6 mb-2 text-primary" />
                <span className="text-foreground">Мои мероприятия</span>
              </div>
            </Button>
            
            <Button
              onClick={onFindVenue}
              variant="outline"
              className="py-8 rounded-xl border-2 border-[#3B6EA5]/30 hover:border-[#3B6EA5] hover:bg-[#3B6EA5]/5 transition-all"
            >
              <div className="flex flex-col items-center">
                <MapPin className="w-6 h-6 mb-2 text-[#3B6EA5]" />
                <span className="text-foreground">Площадки</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended venues */}
      <div className="px-6 mt-8">
        {/* Promo Banner */}
        <div className="mb-6">
          <PromoBanner onBannerClick={(id) => console.log('Banner clicked:', id)} />
        </div>

        <h3 className="mb-4 text-foreground">Рекомендованные площадки</h3>
        
        <div className="space-y-3">
          {recommendedVenues.map((venue, index) => (
            <div
              key={index}
              onClick={onFindVenue}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-cyan-900 mb-1">{venue.name}</h4>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>👥 {venue.capacity}</span>
                    <span>⭐ {venue.rating}</span>
                  </div>
                  <p className="text-cyan-600 mt-1">от {venue.price.toLocaleString()} сом</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 gap-1 px-2 py-3">
            <button className="flex flex-col items-center gap-1 py-2 text-primary transition-transform hover:scale-110 active:scale-95">
              <Sparkles className="w-6 h-6" />
              <span className="text-primary">Главная</span>
            </button>
            <button
              onClick={onFindVenue}
              className="flex flex-col items-center gap-1 py-2 text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95"
            >
              <MapPin className="w-6 h-6" />
              <span>Площадки</span>
            </button>
            <button
              onClick={() => onNavigate('budget')}
              className="flex flex-col items-center gap-1 py-2 text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95"
            >
              <Wallet className="w-6 h-6" />
              <span>Бюджет</span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center gap-1 py-2 text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95"
            >
              <User className="w-6 h-6" />
              <span>Профиль</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacing for fixed bottom nav */}
      <div className="h-24"></div>
    </div>
  );
}