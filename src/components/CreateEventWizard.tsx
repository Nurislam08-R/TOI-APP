import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Users, DollarSign, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { EthnicBorder } from './EthnicPattern';
import { Event } from '../App';

interface CreateEventWizardProps {
  onComplete: (event: Event) => void;
  onBack: () => void;
}

export function CreateEventWizard({ onComplete, onBack }: CreateEventWizardProps) {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    guests: 50,
    budget: 100000,
    type: ''
  });

  const eventTypes = [
    { id: 'той', name: 'Той', emoji: '🎊' },
    { id: 'wedding', name: 'Свадьба', emoji: '💒' },
    { id: 'kyz-uzatu', name: 'Кыз узату', emoji: '👰' },
    { id: 'birthday', name: 'День рождения', emoji: '🎂' },
    { id: 'picnic', name: 'Пикник', emoji: '🏞️' },
    { id: 'corporate', name: 'Корпоратив', emoji: '🏢' },
    { id: 'other', name: 'Другое', emoji: '🎉' }
  ];

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete({
        id: Date.now().toString(),
        ...eventData
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return eventData.name.trim().length > 0;
      case 2:
        return eventData.date && eventData.time;
      case 3:
        return eventData.guests > 0;
      case 4:
        return eventData.budget > 0;
      case 5:
        return eventData.type.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-cyan-700" />
          </button>
          <div className="flex-1 mx-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full ${
                    s <= step ? 'bg-cyan-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-cyan-600">Шаг {step}/5</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-cyan-500" />
              <h2 className="mb-2 text-cyan-900">Название мероприятия</h2>
              <div className="w-20 mx-auto">
                <EthnicBorder className="text-cyan-400" />
              </div>
            </div>
            <Input
              placeholder="Например: Юбилей 50 лет"
              value={eventData.name}
              onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
              className="py-6 rounded-xl border-2 border-cyan-200 focus:border-cyan-500"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="mb-2 text-cyan-900">Дата и время</h2>
              <div className="w-20 mx-auto">
                <EthnicBorder className="text-cyan-400" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Дата</label>
                <Input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="py-6 rounded-xl border-2 border-cyan-200 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Время</label>
                <Input
                  type="time"
                  value={eventData.time}
                  onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                  className="py-6 rounded-xl border-2 border-cyan-200 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
              <h2 className="mb-2 text-cyan-900">Количество гостей</h2>
              <div className="w-20 mx-auto">
                <EthnicBorder className="text-cyan-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center gap-8">
                <Button
                  onClick={() => setEventData({ ...eventData, guests: Math.max(1, eventData.guests - 10) })}
                  className="w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white text-2xl"
                >
                  −
                </Button>
                <div className="text-center">
                  <div className="text-cyan-900">{eventData.guests}</div>
                  <p className="text-gray-500">гостей</p>
                </div>
                <Button
                  onClick={() => setEventData({ ...eventData, guests: eventData.guests + 10 })}
                  className="w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white text-2xl"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="mb-2 text-cyan-900">Бюджет</h2>
              <div className="w-20 mx-auto">
                <EthnicBorder className="text-cyan-400" />
              </div>
            </div>
            <div>
              <Input
                type="number"
                placeholder="Введите бюджет в сомах"
                value={eventData.budget}
                onChange={(e) => setEventData({ ...eventData, budget: Number(e.target.value) })}
                className="py-6 rounded-xl border-2 border-cyan-200 focus:border-cyan-500"
              />
              <p className="mt-2 text-center text-gray-500">
                {eventData.budget.toLocaleString()} сом
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[50000, 100000, 200000, 300000, 500000, 1000000].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setEventData({ ...eventData, budget: amount })}
                  variant="outline"
                  className="py-4 rounded-xl hover:bg-cyan-50 hover:border-cyan-400"
                >
                  {(amount / 1000).toFixed(0)}k
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-cyan-900">Тип мероприятия</h2>
              <div className="w-20 mx-auto">
                <EthnicBorder className="text-cyan-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setEventData({ ...eventData, type: type.id })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    eventData.type === type.id
                      ? 'border-cyan-500 bg-cyan-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-cyan-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{type.emoji}</div>
                  <div className="text-cyan-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 5 ? 'Создать мероприятие' : 'Далее'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
