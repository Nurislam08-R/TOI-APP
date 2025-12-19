import { ArrowLeft, Edit, Users, DollarSign, MapPin, Palette, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Event, Guest, BudgetItem } from '../App';
import { EthnicBorder } from './EthnicPattern';

interface EventDashboardProps {
  event: Event | null;
  onNavigate: (screen: string) => void;
  guests: Guest[];
  budgetItems: BudgetItem[];
  onBack: () => void;
}

export function EventDashboard({ event, onNavigate, guests, budgetItems, onBack }: EventDashboardProps) {
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">Нет активного мероприятия</p>
          <Button onClick={onBack}>Вернуться назад</Button>
        </div>
      </div>
    );
  }

  const totalSpent = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const budgetRemaining = event.budget - totalSpent;
  const budgetPercentage = (totalSpent / event.budget) * 100;

  const checklist = [
    { id: 1, title: 'Выбрать площадку', completed: !!event.venue },
    { id: 2, title: 'Добавить гостей', completed: guests.length > 0 },
    { id: 3, title: 'Настроить бюджет', completed: budgetItems.length > 0 },
    { id: 4, title: 'Выбрать оформление', completed: false },
    { id: 5, title: 'Отправить приглашения', completed: false }
  ];

  const completedTasks = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedTasks / checklist.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-6">
        <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="mb-2">{event.name}</h1>
        <p className="text-cyan-100">{event.date} • {event.time}</p>
        <div className="mt-4">
          <EthnicBorder className="text-white" />
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700">Прогресс подготовки</span>
            <span className="text-cyan-600">{completedTasks}/{checklist.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="px-6 py-6 space-y-4">
        {/* Budget */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-cyan-900">Бюджет</h3>
                <p className="text-gray-500">{totalSpent.toLocaleString()} / {event.budget.toLocaleString()} сом</p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('budget')}
              size="sm"
              variant="outline"
              className="rounded-xl"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
          </div>
          {budgetRemaining < 0 && (
            <p className="mt-2 text-red-600">Превышен на {Math.abs(budgetRemaining).toLocaleString()} сом</p>
          )}
        </div>

        {/* Guests */}
        <div
          onClick={() => onNavigate('guests')}
          className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-cyan-900">Гости</h3>
                <p className="text-gray-500">{guests.length} добавлено • План: {event.guests}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl">
              Открыть
            </Button>
          </div>
        </div>

        {/* Venue */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-cyan-900">Площадка</h3>
                <p className="text-gray-500">
                  {event.venue ? event.venue.name : 'Не выбрана'}
                </p>
              </div>
            </div>
          </div>
          {event.venue ? (
            <Button
              onClick={() => onNavigate('venueDetail')}
              variant="outline"
              className="w-full rounded-xl"
            >
              Посмотреть детали
            </Button>
          ) : (
            <Button
              onClick={() => onNavigate('venueList')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl"
            >
              Выбрать площадку
            </Button>
          )}
        </div>

        {/* Design */}
        <div
          onClick={() => onNavigate('decoration')}
          className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-cyan-900">Оформление</h3>
              <p className="text-gray-500">Тема и декор</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white shadow-sm"></div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white shadow-sm"></div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white shadow-sm"></div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white shadow-sm"></div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-3 rounded-xl hover:bg-purple-50 hover:border-purple-400"
          >
            Выбрать тему
          </Button>
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-cyan-900">Чек-лист</h3>
          </div>
          <div className="space-y-2">
            {checklist.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                  item.completed
                    ? 'bg-cyan-500 border-cyan-500'
                    : 'border-gray-300'
                }`}>
                  {item.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <span className={item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}>
                  {item.title}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
}