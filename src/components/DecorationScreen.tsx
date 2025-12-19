import { ArrowLeft, Palette, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface DecorationScreenProps {
  onBack: () => void;
  onApplyTheme: (theme: any) => void;
}

export function DecorationScreen({ onBack, onApplyTheme }: DecorationScreenProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('classic');

  const themes = [
    {
      id: 'classic',
      name: 'Классический той',
      description: 'Традиционные кыргызские мотивы',
      colors: ['#1FB6B4', '#D4A017', '#B33A3A'],
      emoji: '🏔️'
    },
    {
      id: 'modern',
      name: 'Современный стиль',
      description: 'Минималистичный дизайн',
      colors: ['#3B6EA5', '#A7D8F0', '#FCFBF9'],
      emoji: '✨'
    },
    {
      id: 'elegant',
      name: 'Элегантный',
      description: 'Изысканные золотые тона',
      colors: ['#D4A017', '#FCFBF9', '#0F1720'],
      emoji: '👑'
    },
    {
      id: 'romantic',
      name: 'Романтичный',
      description: 'Нежные пастельные цвета',
      colors: ['#FFB6C1', '#FFF0F5', '#E6E6FA'],
      emoji: '💕'
    },
    {
      id: 'vibrant',
      name: 'Яркий',
      description: 'Насыщенные праздничные цвета',
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
      emoji: '🎨'
    },
    {
      id: 'natural',
      name: 'Природный',
      description: 'Натуральные земляные тона',
      colors: ['#8B4513', '#DEB887', '#F5DEB3'],
      emoji: '🌿'
    }
  ];

  const handleApplyTheme = () => {
    const theme = themes.find(t => t.id === selectedTheme);
    if (theme) {
      onApplyTheme(theme);
      // Show success message
      alert(`Тема "${theme.name}" применена!`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-[#3B6EA5] text-white px-6 py-6 sticky top-0 z-10">
        <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <Palette className="w-8 h-8" />
          <div>
            <h1 className="mb-1">Оформление</h1>
            <p className="text-[#A7D8F0]">Выберите тему мероприятия</p>
          </div>
        </div>
      </div>

      {/* Themes */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`bg-card rounded-2xl p-5 cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? 'border-2 border-primary shadow-lg scale-[1.02]'
                  : 'border-2 border-transparent shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{theme.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-card-foreground mb-1">{theme.name}</h3>
                      <p className="text-muted-foreground">{theme.description}</p>
                    </div>
                    {selectedTheme === theme.id && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Color palette preview */}
                  <div className="flex gap-2 mt-3">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-xl shadow-sm border-2 border-white"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Apply button */}
        <div className="sticky bottom-6 mt-6">
          <Button
            onClick={handleApplyTheme}
            className="w-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white py-6 rounded-2xl shadow-lg"
          >
            <Palette className="w-5 h-5 mr-2" />
            Применить тему
          </Button>
        </div>
      </div>
    </div>
  );
}
