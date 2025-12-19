import { useState } from 'react';
import { ArrowLeft, Plus, UserPlus, Send, Users, User, Search, CheckCircle, XCircle, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Guest, Family } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface GuestsScreenProps {
  guests: Guest[];
  families: Family[];
  onAddGuest: (guest: Guest) => void;
  onBack: () => void;
  onViewFamily?: (familyId: string) => void;
}

export function GuestsScreen({ guests, families, onAddGuest, onBack, onViewFamily }: GuestsScreenProps) {
  const [isAddingGuest, setIsAddingGuest] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('guests');
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    relationshipType: '',
    role: 'other' as 'head' | 'parent' | 'child' | 'relative' | 'other',
    rsvpStatus: 'pending' as 'confirmed' | 'maybe' | 'declined' | 'pending',
    familyId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGuest.firstName && newGuest.lastName) {
      // Auto-assign to family or create new one
      let familyId = newGuest.familyId;
      
      if (!familyId) {
        // Try to find existing family by last name
        const existingFamily = families.find(f => 
          f.lastName.toLowerCase() === newGuest.lastName.toLowerCase() + 'ы' ||
          f.lastName.toLowerCase() === newGuest.lastName.toLowerCase() + 'евы' ||
          f.lastName.toLowerCase() === newGuest.lastName.toLowerCase() + 'овы'
        );
        
        if (existingFamily) {
          familyId = existingFamily.id;
        }
      }

      onAddGuest({
        id: Date.now().toString(),
        ...newGuest,
        familyId: familyId || `family_${Date.now()}`
      });
      setNewGuest({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        relationshipType: '',
        role: 'other',
        rsvpStatus: 'pending',
        familyId: ''
      });
      setIsAddingGuest(false);
    }
  };

  const handleInvite = (guest: Guest) => {
    const message = `Здравствуйте ${guest.firstName}! Приглашаем вас на наше мероприятие. Ждём вас!`;
    const cleanPhone = guest.phone?.replace(/[^0-9]/g, '');
    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'declined':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'maybe':
        return <HelpCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getFamilyStatus = (family: Family) => {
    const members = guests.filter(g => g.familyId === family.id);
    const confirmedCount = members.filter(m => m.rsvpStatus === 'confirmed').length;
    const declinedCount = members.filter(m => m.rsvpStatus === 'declined').length;
    const totalCount = members.length;

    if (confirmedCount === totalCount) return { text: 'Придут', color: 'bg-green-100 text-green-700' };
    if (declinedCount === totalCount) return { text: 'Не придут', color: 'bg-red-100 text-red-700' };
    if (confirmedCount > 0) return { text: 'Частично', color: 'bg-yellow-100 text-yellow-700' };
    return { text: 'Ожидается', color: 'bg-gray-100 text-gray-600' };
  };

  const filteredGuests = guests.filter(g =>
    `${g.firstName} ${g.lastName} ${g.middleName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.phone?.includes(searchQuery)
  );

  const filteredFamilies = families.filter(f =>
    f.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-[#3B6EA5] text-white px-6 py-6 sticky top-0 z-10">
        <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-1">Гости</h1>
            <p className="text-[#A7D8F0]">
              {guests.length} {guests.length === 1 ? 'гость' : guests.length < 5 ? 'гостя' : 'гостей'} • {families.length} {families.length === 1 ? 'семья' : families.length < 5 ? 'семьи' : 'семей'}
            </p>
          </div>
          
          <Dialog open={isAddingGuest} onOpenChange={setIsAddingGuest}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white rounded-xl"
              >
                <Plus className="w-4 h-4 mr-1" />
                Добавить
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Добавить гостя</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-foreground">Фамилия *</label>
                  <Input
                    value={newGuest.lastName}
                    onChange={(e) => setNewGuest({ ...newGuest, lastName: e.target.value })}
                    placeholder="Введите фамилию"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-foreground">Имя *</label>
                  <Input
                    value={newGuest.firstName}
                    onChange={(e) => setNewGuest({ ...newGuest, firstName: e.target.value })}
                    placeholder="Введите имя"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-foreground">Отчество</label>
                  <Input
                    value={newGuest.middleName}
                    onChange={(e) => setNewGuest({ ...newGuest, middleName: e.target.value })}
                    placeholder="Введите отчество"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-foreground">Родственная роль</label>
                  <Input
                    value={newGuest.relationshipType}
                    onChange={(e) => setNewGuest({ ...newGuest, relationshipType: e.target.value })}
                    placeholder="мать, отец, сын, дочь и т.д."
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-foreground">Телефон</label>
                  <Input
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                    placeholder="+996 XXX XXX XXX"
                    type="tel"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-foreground">Статус</label>
                  <select
                    value={newGuest.rsvpStatus}
                    onChange={(e) => setNewGuest({ ...newGuest, rsvpStatus: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground"
                  >
                    <option value="pending">Ожидается</option>
                    <option value="confirmed">Придёт</option>
                    <option value="maybe">Возможно</option>
                    <option value="declined">Не придёт</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-foreground">Семья (опционально)</label>
                  <select
                    value={newGuest.familyId}
                    onChange={(e) => setNewGuest({ ...newGuest, familyId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground"
                  >
                    <option value="">Автоматически по фамилии</option>
                    {families.map(f => (
                      <option key={f.id} value={f.id}>{f.lastName}</option>
                    ))}
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white rounded-xl py-6"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Сохранить
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по имени, фамилии или телефону..."
            className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="px-6 py-4">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="guests">
            <User className="w-4 h-4 mr-2" />
            Все гости
          </TabsTrigger>
          <TabsTrigger value="families">
            <Users className="w-4 h-4 mr-2" />
            Семьи
          </TabsTrigger>
        </TabsList>

        {/* All Guests Tab */}
        <TabsContent value="guests">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Гости не найдены' : 'Список гостей пуст'}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setIsAddingGuest(true)}
                  variant="outline"
                  className="rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить первого гостя
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#3B6EA5] flex items-center justify-center text-white flex-shrink-0">
                        {guest.firstName[0]}{guest.lastName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-card-foreground truncate">
                          {guest.lastName} {guest.firstName}
                        </h4>
                        {guest.relationshipType && (
                          <p className="text-muted-foreground truncate">{guest.relationshipType}</p>
                        )}
                        {guest.phone && (
                          <p className="text-muted-foreground truncate">{guest.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getStatusIcon(guest.rsvpStatus)}
                      {guest.phone && (
                        <Button
                          onClick={() => handleInvite(guest)}
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Families Tab */}
        <TabsContent value="families">
          {filteredFamilies.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Семьи не найдены' : 'Нет семей'}
              </p>
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              {filteredFamilies.map((family) => {
                const members = guests.filter(g => g.familyId === family.id);
                const status = getFamilyStatus(family);
                
                return (
                  <div
                    key={family.id}
                    onClick={() => onViewFamily?.(family.id)}
                    className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#3B6EA5] flex items-center justify-center text-white flex-shrink-0">
                        <Users className="w-8 h-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-card-foreground mb-1">{family.lastName}</h3>
                        <p className="text-muted-foreground mb-2">
                          {members.length} {members.length === 1 ? 'человек' : members.length < 5 ? 'человека' : 'человек'}
                        </p>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${status.color}`}>
                          {status.text}
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick action button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setIsAddingGuest(true)}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
