import { Sparkles, MapPin } from 'lucide-react';
import { EthnicPattern, EthnicBorder } from './EthnicPattern';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onCreateEvent: () => void;
  onFindVenue: () => void;
  onNext: () => void;
}

export function WelcomeScreen({ onCreateEvent, onFindVenue, onNext }: WelcomeScreenProps) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#A7D8F0]/20 to-background">
      {/* Ethnic pattern header */}
      <div className="text-primary opacity-40">
        <EthnicPattern className="w-full h-20" />
      </div>

      {/* Logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[#3B6EA5] flex items-center justify-center shadow-lg">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent border-4 border-background"></div>
        </div>

        <h1 className="text-center mb-3 text-foreground">
          Toi App
        </h1>
        
        <p className="text-center text-primary mb-2">
          Организуй свой Той легко
        </p>

        <div className="w-16 mb-12">
          <EthnicBorder className="text-primary" />
        </div>

        {/* Main action buttons */}
        <div className="w-full space-y-3 mb-8">
          <Button
            onClick={onCreateEvent}
            className="w-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white py-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Создать мероприятие
          </Button>

          <Button
            onClick={onFindVenue}
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary/5 py-6 rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Найти площадку
          </Button>
        </div>

        {/* Get started link */}
        <button
          onClick={onNext}
          className="text-primary hover:text-primary/80 underline"
        >
          Узнать больше о приложении
        </button>
      </div>

      {/* Decorative bottom pattern */}
      <div className="text-primary opacity-20 mb-8">
        <EthnicPattern className="w-full h-16" />
      </div>
    </div>
  );
}