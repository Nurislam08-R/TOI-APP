import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { Language } from './i18n/translations';
import { Toaster } from './components/ui/sonner';

// Auth screens
import { RoleSelection } from './components/auth/RoleSelection';
import { PhoneAuth } from './components/auth/PhoneAuth';
import { GoogleAuth } from './components/auth/GoogleAuth';
import { OrganizerRegistration } from './components/auth/OrganizerRegistration';
import { OwnerRegistration } from './components/auth/OwnerRegistration';

// Main app screens
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { CreateEventWizard } from './components/CreateEventWizard';
import { VenueList } from './components/VenueList';
import { VenueDetail } from './components/VenueDetail';
import { EventDashboard } from './components/EventDashboard';
import { GuestsScreen } from './components/GuestsScreen';
import { BudgetScreen } from './components/BudgetScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { DesignSystem } from './components/DesignSystem';
import { MyEventsScreen } from './components/MyEventsScreen';
import { DecorationScreen } from './components/DecorationScreen';
import { FamilyDetailScreen } from './components/FamilyDetailScreen';

// Owner screens
import { OwnerDashboard } from './components/OwnerDashboard';
import { AddVenueScreen } from './components/AddVenueScreen';
import { MyVenuesScreen } from './components/MyVenuesScreen';
import { OwnerBookingsScreen } from './components/OwnerBookingsScreen';
import { ChatScreen } from './components/ChatScreen';

// Settings and utility screens
import { SettingsScreen } from './components/SettingsScreen';
import { SupportScreen } from './components/SupportScreen';
import { LanguageSelector } from './components/LanguageSelector';

export interface User {
  id: string;
  role: 'organizer' | 'owner';
  name: string;
  surname?: string;
  phone?: string;
  email?: string;
  photoUrl?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  budget: number;
  type: string;
  venue?: any;
  ownerId: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  familyId?: string;
  role?: 'head' | 'parent' | 'child' | 'relative' | 'other';
  rsvpStatus?: 'confirmed' | 'maybe' | 'declined' | 'pending';
  photoUrl?: string;
  relationshipType?: string; // мать, отец, брат, сестра и т.д.
}

export interface Family {
  id: string;
  lastName: string;
  headOfFamilyId?: string;
  memberIds: string[];
  contactPhone?: string;
  photoUrl?: string;
  notes?: string;
}

export interface BudgetItem {
  id: string;
  category: 'venue' | 'food' | 'decor' | 'music' | 'photo' | 'other';
  amount: number;
  description: string;
  date?: string;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  photos: string[];
  mainPhoto: string;
  ownerId: string;
  whatsapp: string;
  phone: string;
}

export interface Booking {
  id: string;
  venueId: string;
  eventId: string;
  organizerId: string;
  organizerName: string;
  organizerPhone: string;
  eventName: string;
  date: string;
  time: string;
  guestsCount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  photoUrl?: string;
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('toi-app-theme');
    return saved === 'dark';
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('toi-app-language');
    return (saved as Language) || 'ru';
  });
  const [screen, setScreen] = useState('roleSelection');
  const [authFlow, setAuthFlow] = useState<'phone' | 'google' | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  
  // Sample data - preloaded
  const [guests, setGuests] = useState<Guest[]>([
    // Семья Бековых
    { 
      id: '1', 
      firstName: 'Талант', 
      lastName: 'Беков', 
      middleName: 'Асанович',
      phone: '+996555111222',
      familyId: 'family_1',
      role: 'head',
      rsvpStatus: 'confirmed',
      relationshipType: 'глава семьи'
    },
    { 
      id: '2', 
      firstName: 'Айжан', 
      lastName: 'Бекова', 
      middleName: 'Талантовна',
      phone: '+996555111223',
      familyId: 'family_1',
      role: 'child',
      rsvpStatus: 'confirmed',
      relationshipType: 'дочь'
    },
    { 
      id: '3', 
      firstName: 'Гульмира', 
      lastName: 'Бекова', 
      middleName: 'Кадыровна',
      phone: '+996555111224',
      familyId: 'family_1',
      role: 'parent',
      rsvpStatus: 'confirmed',
      relationshipType: 'жена'
    },
    // Семья Токтосуновых
    { 
      id: '4', 
      firstName: 'Азамат', 
      lastName: 'Токтосунов', 
      middleName: 'Бакытович',
      phone: '+996777333444',
      familyId: 'family_2',
      role: 'head',
      rsvpStatus: 'maybe',
      relationshipType: 'глава семьи'
    },
    { 
      id: '5', 
      firstName: 'Нурай', 
      lastName: 'Токтосунова', 
      middleName: 'Азаматовна',
      phone: '+996777333445',
      familyId: 'family_2',
      role: 'child',
      rsvpStatus: 'maybe',
      relationshipType: 'дочь'
    },
    // Семья Садыковых
    { 
      id: '6', 
      firstName: 'Гульнара', 
      lastName: 'Садыкова', 
      middleName: 'Маратовна',
      phone: '+996555555666',
      familyId: 'family_3',
      role: 'head',
      rsvpStatus: 'confirmed',
      relationshipType: 'глава семьи'
    },
    { 
      id: '7', 
      firstName: 'Салтанат', 
      lastName: 'Садыкова', 
      middleName: 'Гульнаровна',
      phone: '+996555555667',
      familyId: 'family_3',
      role: 'child',
      rsvpStatus: 'confirmed',
      relationshipType: 'дочь'
    },
    { 
      id: '8', 
      firstName: 'Жибек', 
      lastName: 'Садыкова', 
      middleName: 'Гульнаровна',
      phone: '+996555555668',
      familyId: 'family_3',
      role: 'child',
      rsvpStatus: 'pending',
      relationshipType: 'дочь'
    },
    // Семья Алымовых
    { 
      id: '9', 
      firstName: 'Бакыт', 
      lastName: 'Алымов', 
      middleName: 'Темирович',
      phone: '+996777777888',
      familyId: 'family_4',
      role: 'head',
      rsvpStatus: 'declined',
      relationshipType: 'глава семьи'
    },
    // Семья Касымовых
    { 
      id: '10', 
      firstName: 'Темирлан', 
      lastName: 'Касымов', 
      middleName: 'Эрланович',
      phone: '+996777111222',
      familyId: 'family_5',
      role: 'head',
      rsvpStatus: 'pending',
      relationshipType: 'глава семьи'
    },
    { 
      id: '11', 
      firstName: 'Эрлан', 
      lastName: 'Касымов', 
      middleName: 'Темирланович',
      phone: '+996777111223',
      familyId: 'family_5',
      role: 'child',
      rsvpStatus: 'pending',
      relationshipType: 'сын'
    },
    { 
      id: '12', 
      firstName: 'Максат', 
      lastName: 'Касымов', 
      middleName: 'Темирланович',
      phone: '+996777111224',
      familyId: 'family_5',
      role: 'child',
      rsvpStatus: 'pending',
      relationshipType: 'сын'
    }
  ]);

  const [families, setFamilies] = useState<Family[]>([
    {
      id: 'family_1',
      lastName: 'Бековы',
      headOfFamilyId: '1',
      memberIds: ['1', '2', '3'],
      contactPhone: '+996555111222'
    },
    {
      id: 'family_2',
      lastName: 'Токтосуновы',
      headOfFamilyId: '4',
      memberIds: ['4', '5'],
      contactPhone: '+996777333444'
    },
    {
      id: 'family_3',
      lastName: 'Садыковы',
      headOfFamilyId: '6',
      memberIds: ['6', '7', '8'],
      contactPhone: '+996555555666'
    },
    {
      id: 'family_4',
      lastName: 'Алымовы',
      headOfFamilyId: '9',
      memberIds: ['9'],
      contactPhone: '+996777777888'
    },
    {
      id: 'family_5',
      lastName: 'Касымовы',
      headOfFamilyId: '10',
      memberIds: ['10', '11', '12'],
      contactPhone: '+996777111222'
    }
  ]);
  
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: '1', category: 'venue', amount: 50000, description: 'Аренда зала' },
    { id: '2', category: 'food', amount: 80000, description: 'Банкет на 100 человек' },
    { id: '3', category: 'decor', amount: 25000, description: 'Оформление зала' }
  ]);
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Той Каныкей',
      date: '2025-06-15',
      time: '18:00',
      guests: 250,
      budget: 300000,
      type: 'той',
      ownerId: 'user_1'
    },
    {
      id: '2',
      name: 'День родения Азамата',
      date: '2025-05-20',
      time: '19:00',
      guests: 50,
      budget: 80000,
      type: 'birthday',
      ownerId: 'user_1'
    },
    {
      id: '3',
      name: 'Корпоратив компании',
      date: '2025-12-25',
      time: '20:00',
      guests: 150,
      budget: 200000,
      type: 'corporate',
      ownerId: 'user_1'
    }
  ]);

  // Owner-specific state
  const [venues, setVenues] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Toggle dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('toi-app-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('toi-app-language', language);
  }, [language]);

  const navigateTo = (screenName: string, data?: any) => {
    setScreen(screenName);
    if (data?.event) setCurrentEvent(data.event);
    if (data?.venue) setSelectedVenue(data.venue);
    if (data?.familyId) setSelectedFamilyId(data.familyId);
  };

  const handleRoleSelection = (role: 'organizer' | 'owner') => {
    if (role === 'organizer') {
      setAuthFlow('phone');
      navigateTo('phoneAuth');
    } else {
      setAuthFlow('google');
      navigateTo('googleAuth');
    }
  };

  const handlePhoneVerified = (phone: string) => {
    // Simulate checking if user exists
    navigateTo('organizerRegistration', { phone });
  };

  const handleGoogleAuth = (email: string, name: string) => {
    // Simulate Google OAuth
    navigateTo('ownerRegistration', { email, name });
  };

  const handleOrganizerRegistered = (userData: Partial<User>) => {
    const newUser: User = {
      id: Date.now().toString(),
      role: 'organizer',
      name: userData.name!,
      surname: userData.surname,
      phone: userData.phone,
      photoUrl: userData.photoUrl
    };
    setUser(newUser);
    navigateTo('home');
  };

  const handleOwnerRegistered = (userData: Partial<User>) => {
    const newUser: User = {
      id: Date.now().toString(),
      role: 'owner',
      name: userData.name!,
      surname: userData.surname,
      email: userData.email,
      phone: userData.phone,
      photoUrl: userData.photoUrl
    };
    setUser(newUser);
    navigateTo('home');
  };

  const createEvent = (eventData: Event) => {
    const newEvent = { ...eventData, id: Date.now().toString(), ownerId: user?.id || '' };
    setEvents([...events, newEvent]);
    setCurrentEvent(newEvent);
    navigateTo('eventDashboard');
  };

  const updateEvent = (eventData: Partial<Event>) => {
    if (currentEvent) {
      const updatedEvent = { ...currentEvent, ...eventData };
      setCurrentEvent(updatedEvent);
      setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    }
  };

  const addGuest = (guest: Guest) => {
    setGuests([...guests, { ...guest, id: Date.now().toString() }]);
  };

  const addBudgetItem = (item: BudgetItem) => {
    setBudgetItems([...budgetItems, { ...item, id: Date.now().toString() }]);
  };

  // Owner functions
  const addVenue = (venueData: Omit<Venue, 'id'>) => {
    const newVenue = { ...venueData, id: Date.now().toString() };
    setVenues([...venues, newVenue]);
    navigateTo('ownerDashboard');
  };

  const createBooking = (venueData: Venue) => {
    if (!currentEvent || !user) return;
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      venueId: venueData.id,
      eventId: currentEvent.id,
      organizerId: user.id,
      organizerName: `${user.name} ${user.surname || ''}`.trim(),
      organizerPhone: user.phone || '',
      eventName: currentEvent.name,
      date: currentEvent.date,
      time: currentEvent.time,
      guestsCount: currentEvent.guests,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setBookings([...bookings, newBooking]);
  };

  const updateBookingStatus = (bookingId: string, status: 'confirmed' | 'cancelled') => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const sendChatMessage = (bookingId: string, text: string, photoUrl?: string) => {
    if (!user) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      bookingId,
      senderId: user.id,
      senderName: `${user.name} ${user.surname || ''}`.trim(),
      text,
      timestamp: new Date().toISOString(),
      photoUrl,
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  const renderScreen = () => {
    // Auth flow
    if (screen === 'roleSelection') {
      return <RoleSelection onSelectRole={handleRoleSelection} />;
    }
    if (screen === 'phoneAuth') {
      return (
        <PhoneAuth
          onVerified={handlePhoneVerified}
          onBack={() => navigateTo('roleSelection')}
        />
      );
    }
    if (screen === 'googleAuth') {
      return (
        <GoogleAuth
          onAuthenticated={handleGoogleAuth}
          onBack={() => navigateTo('roleSelection')}
        />
      );
    }
    if (screen === 'organizerRegistration') {
      return (
        <OrganizerRegistration
          onComplete={handleOrganizerRegistered}
          onBack={() => navigateTo('phoneAuth')}
        />
      );
    }
    if (screen === 'ownerRegistration') {
      return (
        <OwnerRegistration
          onComplete={handleOwnerRegistered}
          onBack={() => navigateTo('googleAuth')}
        />
      );
    }

    // Main app screens
    if (screen === 'designSystem') {
      return <DesignSystem onBack={() => navigateTo('home')} />;
    }

    switch (screen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onCreateEvent={() => navigateTo('createEvent')}
            onFindVenue={() => navigateTo('venueList')}
            onNext={() => {
              setOnboardingStep(1);
              navigateTo('onboarding');
            }}
          />
        );
      case 'onboarding':
        return (
          <OnboardingScreen
            step={onboardingStep}
            onNext={() => {
              if (onboardingStep < 2) {
                setOnboardingStep(onboardingStep + 1);
              } else {
                navigateTo('home');
              }
            }}
            onStart={() => navigateTo('home')}
          />
        );
      case 'home':
        // Different home for owner vs organizer
        if (user?.role === 'owner') {
          return (
            <OwnerDashboard
              user={user}
              venues={venues.filter(v => v.ownerId === user.id)}
              bookings={bookings.filter(b => venues.some(v => v.id === b.venueId && v.ownerId === user.id))}
              onNavigate={navigateTo}
            />
          );
        }
        return (
          <HomeScreen
            onCreateEvent={() => navigateTo('createEvent')}
            onMyEvents={() => navigateTo('myEvents')}
            onFindVenue={() => navigateTo('venueList')}
            onNavigate={navigateTo}
            events={events}
            user={user}
          />
        );
      case 'myEvents':
        return (
          <MyEventsScreen
            events={events}
            onSelectEvent={(event) => {
              setCurrentEvent(event);
              navigateTo('eventDashboard');
            }}
            onCreateEvent={() => navigateTo('createEvent')}
            onBack={() => navigateTo('home')}
          />
        );
      case 'createEvent':
        return (
          <CreateEventWizard
            onComplete={createEvent}
            onBack={() => navigateTo('home')}
          />
        );
      case 'venueList':
        return (
          <VenueList
            onSelectVenue={(venue) => navigateTo('venueDetail', { venue })}
            onBack={() => navigateTo('home')}
          />
        );
      case 'venueDetail':
        return (
          <VenueDetail
            venue={selectedVenue}
            onBack={() => navigateTo('venueList')}
            onSelect={() => {
              if (currentEvent) {
                updateEvent({ venue: selectedVenue });
              }
              navigateTo('eventDashboard');
            }}
          />
        );
      case 'eventDashboard':
        return (
          <EventDashboard
            event={currentEvent}
            onNavigate={navigateTo}
            guests={guests}
            budgetItems={budgetItems}
            onBack={() => navigateTo('home')}
          />
        );
      case 'guests':
        return (
          <GuestsScreen
            guests={guests}
            families={families}
            onAddGuest={addGuest}
            onViewFamily={(familyId) => {
              navigateTo('familyDetail', { familyId });
            }}
            onBack={() => navigateTo('eventDashboard')}
          />
        );
      case 'familyDetail':
        const selectedFamily = families.find(f => f.id === selectedFamilyId);
        return (
          <FamilyDetailScreen
            family={selectedFamily || families[0]}
            guests={guests}
            onBack={() => navigateTo('guests')}
          />
        );
      case 'budget':
        return (
          <BudgetScreen
            budgetItems={budgetItems}
            totalBudget={currentEvent?.budget || 0}
            onAddItem={addBudgetItem}
            onBack={() => navigateTo('eventDashboard')}
          />
        );
      case 'decoration':
        return (
          <DecorationScreen
            onBack={() => navigateTo('eventDashboard')}
            onApplyTheme={(theme) => {
              console.log('Theme applied:', theme);
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            language={language}
            onBack={() => navigateTo('home')}
            onNavigateToSettings={() => navigateTo('settings')}
            onNavigateToLanguage={() => navigateTo('languageSelector')}
            onNavigateToSupport={() => navigateTo('support')}
            onLogout={() => {
              setUser(null);
              setEvents([]);
              setGuests([]);
              setBudgetItems([]);
              setCurrentEvent(null);
              navigateTo('roleSelection');
            }}
          />
        );
      
      case 'settings':
        if (!user) return null;
        return (
          <SettingsScreen
            user={user}
            language={language}
            onBack={() => navigateTo('profile')}
            onUpdateUser={(userData) => {
              setUser({ ...user, ...userData });
            }}
          />
        );
      
      case 'languageSelector':
        return (
          <LanguageSelector
            currentLanguage={language}
            onBack={() => navigateTo('profile')}
            onSelectLanguage={(lang) => {
              setLanguage(lang);
              navigateTo('profile');
            }}
          />
        );
      
      case 'support':
        return (
          <SupportScreen
            language={language}
            onBack={() => navigateTo('profile')}
          />
        );
      
      // Owner routes
      case 'ownerDashboard':
        return (
          <OwnerDashboard
            user={user}
            venues={venues.filter(v => v.ownerId === user?.id)}
            bookings={bookings.filter(b => venues.some(v => v.id === b.venueId && v.ownerId === user?.id))}
            onNavigate={navigateTo}
          />
        );
      
      case 'addVenue':
        return (
          <AddVenueScreen
            onComplete={addVenue}
            onBack={() => navigateTo('ownerDashboard')}
            userId={user?.id || ''}
          />
        );
      
      case 'myVenues':
        return (
          <MyVenuesScreen
            venues={venues.filter(v => v.ownerId === user?.id)}
            onAddVenue={() => navigateTo('addVenue')}
            onSelectVenue={(venue) => navigateTo('venueDetail', { venue })}
            onBack={() => navigateTo('ownerDashboard')}
          />
        );
      
      case 'ownerBookings':
        const ownerBookings = bookings.filter(b => venues.some(v => v.id === b.venueId && v.ownerId === user?.id));
        return (
          <OwnerBookingsScreen
            bookings={ownerBookings}
            venues={venues}
            onUpdateBooking={updateBookingStatus}
            onOpenChat={(bookingId) => {
              setSelectedBookingId(bookingId);
              navigateTo('chat');
            }}
            onBack={() => navigateTo('ownerDashboard')}
          />
        );
      
      case 'chat':
        const chatBooking = bookings.find(b => b.id === selectedBookingId);
        if (!chatBooking) return <div>Бронь не найдена</div>;
        return (
          <ChatScreen
            booking={chatBooking}
            messages={chatMessages.filter(m => m.bookingId === selectedBookingId)}
            currentUser={user}
            onSendMessage={(text, photoUrl) => sendChatMessage(selectedBookingId!, text, photoUrl)}
            onBack={() => navigateTo('ownerBookings')}
          />
        );
      
      case 'ownerProfile':
        return (
          <ProfileScreen
            user={user}
            language={language}
            onBack={() => navigateTo('ownerDashboard')}
            onNavigateToSettings={() => navigateTo('settings')}
            onNavigateToLanguage={() => navigateTo('languageSelector')}
            onNavigateToSupport={() => navigateTo('support')}
            onLogout={() => {
              setUser(null);
              setVenues([]);
              setBookings([]);
              setChatMessages([]);
              navigateTo('roleSelection');
            }}
          />
        );

      default:
        return <RoleSelection onSelectRole={handleRoleSelection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background min-h-screen relative">
        {/* Theme toggle - fixed top right */}
        {user && screen !== 'roleSelection' && screen !== 'phoneAuth' && screen !== 'googleAuth' && (
          <button
            onClick={() => setIsDark(!isDark)}
            className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </button>
        )}

        {/* Design System access (development only) */}
        {user && process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => navigateTo('designSystem')}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 rounded-lg bg-accent text-accent-foreground shadow-lg text-xs opacity-50 hover:opacity-100 transition-opacity"
          >
            DS
          </button>
        )}

        {renderScreen()}
        
        {/* Toast notifications */}
        <Toaster />
      </div>
    </div>
  );
}