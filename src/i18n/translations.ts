// Система переводов для Toi App
export type Language = 'ru' | 'kg' | 'en';

export interface Translations {
  // Общие
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    confirm: string;
    close: string;
    search: string;
    loading: string;
  };
  
  // Навигация
  nav: {
    home: string;
    events: string;
    profile: string;
    venues: string;
    bookings: string;
  };
  
  // Профиль
  profile: {
    title: string;
    organizer: string;
    owner: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    photo: string;
    editProfile: string;
    settings: string;
    language: string;
    support: string;
    logout: string;
    logoutConfirm: string;
    appVersion: string;
    rightsReserved: string;
  };
  
  // Настройки
  settings: {
    title: string;
    profileSettings: string;
    accountSettings: string;
    updatePhoto: string;
    deletePhoto: string;
    changePhone: string;
    changeEmail: string;
    notifications: string;
    privacy: string;
    theme: string;
    lightTheme: string;
    darkTheme: string;
    savedSuccessfully: string;
  };
  
  // Поддержка
  support: {
    title: string;
    chatWithAI: string;
    typeMessage: string;
    send: string;
    faqTitle: string;
    faq1: string;
    faq2: string;
    faq3: string;
    faq4: string;
    faq5: string;
    faq6: string;
    aiGreeting: string;
    aiHelp: string;
  };
  
  // События
  events: {
    myEvents: string;
    createEvent: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    guestsCount: string;
    budget: string;
    eventType: string;
    wedding: string;
    birthday: string;
    corporate: string;
    other: string;
    dashboard: string;
  };
  
  // Гости
  guests: {
    title: string;
    addGuest: string;
    confirmed: string;
    maybe: string;
    declined: string;
    pending: string;
    families: string;
    individuals: string;
    total: string;
    familyMembers: string;
  };
  
  // Площадки
  venues: {
    findVenue: string;
    myVenues: string;
    addVenue: string;
    capacity: string;
    price: string;
    perHour: string;
    location: string;
    contact: string;
    book: string;
    details: string;
  };
  
  // Бронирования
  bookings: {
    myBookings: string;
    pending: string;
    confirmed: string;
    cancelled: string;
    acceptBooking: string;
    declineBooking: string;
    chat: string;
    viewDetails: string;
  };
  
  // Бюджет
  budgetScreen: {
    title: string;
    total: string;
    spent: string;
    remaining: string;
    addExpense: string;
    venue: string;
    food: string;
    decor: string;
    music: string;
    photo: string;
    other: string;
  };
  
  // Языки
  languages: {
    russian: string;
    kyrgyz: string;
    english: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    common: {
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      back: 'Назад',
      next: 'Далее',
      confirm: 'Подтвердить',
      close: 'Закрыть',
      search: 'Поиск',
      loading: 'Загрузка...',
    },
    nav: {
      home: 'Главная',
      events: 'Мероприятия',
      profile: 'Профиль',
      venues: 'Площадки',
      bookings: 'Брони',
    },
    profile: {
      title: 'Профиль',
      organizer: 'Организатор мероприятий',
      owner: 'Владелец здания',
      firstName: 'Имя',
      lastName: 'Фамилия',
      middleName: 'Отчество',
      phone: 'Телефон',
      email: 'Email',
      photo: 'Фото',
      editProfile: 'Редактировать профиль',
      settings: 'Настройки',
      language: 'Язык приложения',
      support: 'Поддержка',
      logout: 'Выйти из аккаунта',
      logoutConfirm: 'Вы уверены, что хотите выйти?',
      appVersion: 'Toi App v1.0',
      rightsReserved: '© 2024 Все права защищены',
    },
    settings: {
      title: 'Настройки',
      profileSettings: 'Настройки профиля',
      accountSettings: 'Настройки аккаунта',
      updatePhoto: 'Обновить фото',
      deletePhoto: 'Удалить фото',
      changePhone: 'Изменить телефон',
      changeEmail: 'Изменить email',
      notifications: 'Уведомления',
      privacy: 'Приватность',
      theme: 'Тема',
      lightTheme: 'Светлая',
      darkTheme: 'Тёмная',
      savedSuccessfully: 'Изменения сохранены',
    },
    support: {
      title: 'Поддержка',
      chatWithAI: 'Чат с ИИ-помощником',
      typeMessage: 'Введите сообщение...',
      send: 'Отправить',
      faqTitle: 'Частые вопросы',
      faq1: 'Как создать мероприятие?',
      faq2: 'Как забронировать площадку?',
      faq3: 'Как добавить гостей?',
      faq4: 'Как управлять бюджетом?',
      faq5: 'Как связаться с владельцем?',
      faq6: 'Как изменить данные профиля?',
      aiGreeting: 'Салам! Я ваш ИИ-помощник в Toi App. Чем могу помочь?',
      aiHelp: 'Вы можете задать мне любой вопрос о приложении или выбрать один из частых вопросов ниже.',
    },
    events: {
      myEvents: 'Мои мероприятия',
      createEvent: 'Создать мероприятие',
      eventName: 'Название мероприятия',
      eventDate: 'Дата',
      eventTime: 'Время',
      guestsCount: 'Количество гостей',
      budget: 'Бюджет',
      eventType: 'Тип мероприятия',
      wedding: 'Той',
      birthday: 'День рождения',
      corporate: 'Корпоратив',
      other: 'Другое',
      dashboard: 'Панель мероприятия',
    },
    guests: {
      title: 'Гости',
      addGuest: 'Добавить гостя',
      confirmed: 'Подтвердили',
      maybe: 'Может быть',
      declined: 'Отказались',
      pending: 'Ожидание',
      families: 'Семьи',
      individuals: 'Отдельно',
      total: 'Всего',
      familyMembers: 'Членов семьи',
    },
    venues: {
      findVenue: 'Найти площадку',
      myVenues: 'Мои площадки',
      addVenue: 'Добавить площадку',
      capacity: 'Вместимость',
      price: 'Цена',
      perHour: 'в час',
      location: 'Расположение',
      contact: 'Контакты',
      book: 'Забронировать',
      details: 'Детали',
    },
    bookings: {
      myBookings: 'Мои брони',
      pending: 'Ожидание',
      confirmed: 'Подтверждено',
      cancelled: 'Отменено',
      acceptBooking: 'Принять',
      declineBooking: 'Отклонить',
      chat: 'Чат',
      viewDetails: 'Подробнее',
    },
    budgetScreen: {
      title: 'Бюджет',
      total: 'Общий бюджет',
      spent: 'Потрачено',
      remaining: 'Остаток',
      addExpense: 'Добавить расход',
      venue: 'Площадка',
      food: 'Еда',
      decor: 'Декор',
      music: 'Музыка',
      photo: 'Фото',
      other: 'Другое',
    },
    languages: {
      russian: 'Русский',
      kyrgyz: 'Кыргызча',
      english: 'English',
    },
  },
  
  kg: {
    common: {
      save: 'Сактоо',
      cancel: 'Жокко чыгаруу',
      delete: 'Өчүрүү',
      edit: 'Түзөтүү',
      back: 'Артка',
      next: 'Кийинки',
      confirm: 'Ырастоо',
      close: 'Жабуу',
      search: 'Издөө',
      loading: 'Жүктөлүүдө...',
    },
    nav: {
      home: 'Башкы бет',
      events: 'Иш-чаралар',
      profile: 'Профиль',
      venues: 'Жайлар',
      bookings: 'Брондор',
    },
    profile: {
      title: 'Профиль',
      organizer: 'Иш-чара уюштуруучу',
      owner: 'Жай ээси',
      firstName: 'Аты',
      lastName: 'Фамилиясы',
      middleName: 'Атасынын аты',
      phone: 'Телефон',
      email: 'Электрондук почта',
      photo: 'Сүрөт',
      editProfile: 'Профилди түзөтүү',
      settings: 'Тууралоолор',
      language: 'Тил',
      support: 'Колдоо',
      logout: 'Чыгуу',
      logoutConfirm: 'Чыгууну каалайсызбы?',
      appVersion: 'Toi App v1.0',
      rightsReserved: '© 2024 Бардык укуктар корголгон',
    },
    settings: {
      title: 'Тууралоолор',
      profileSettings: 'Профиль тууралоолору',
      accountSettings: 'Аккаунт тууралоолору',
      updatePhoto: 'Сүрөттү жаңыртуу',
      deletePhoto: 'Сүрөттү өчүрүү',
      changePhone: 'Телефонду өзгөртүү',
      changeEmail: 'Email өзгөртүү',
      notifications: 'Билдирмелер',
      privacy: 'Купуялык',
      theme: 'Тема',
      lightTheme: 'Ачык',
      darkTheme: 'Караңгы',
      savedSuccessfully: 'Өзгөртүүлөр сакталды',
    },
    support: {
      title: 'Колдоо',
      chatWithAI: 'АИ-жардамчы менен баарлашуу',
      typeMessage: 'Билдирүү жазыңыз...',
      send: 'Жөнөтүү',
      faqTitle: 'Көп берилүүчү суроолор',
      faq1: 'Иш-чараны кантип түзүү керек?',
      faq2: 'Жайды кантип брондоо керек?',
      faq3: 'Конокторду кантип кошуу керек?',
      faq4: 'Бюджетти кантип башкаруу керек?',
      faq5: 'Жай ээси менен кантип байланышуу керек?',
      faq6: 'Профиль маалыматтарын кантип өзгөртүү керек?',
      aiGreeting: 'Салам! Мен Toi App тиркемесиндеги АИ-жардамчымын. Эмне менен жардам бере алам?',
      aiHelp: 'Сиз мага тиркеме жөнүндө каалаган суроо берсеңиз болот же төмөнкү көп берилүүчү суроолордун биринен тандай аласыз.',
    },
    events: {
      myEvents: 'Менин иш-чараларым',
      createEvent: 'Иш-чара түзүү',
      eventName: 'Иш-чаранын аталышы',
      eventDate: 'Күнү',
      eventTime: 'Убакыты',
      guestsCount: 'Конок саны',
      budget: 'Бюджет',
      eventType: 'Иш-чаранын түрү',
      wedding: 'Той',
      birthday: 'Туулган күн',
      corporate: 'Корпоратив',
      other: 'Башка',
      dashboard: 'Иш-чара панели',
    },
    guests: {
      title: 'Конок',
      addGuest: 'Конок кошуу',
      confirmed: 'Ырастады',
      maybe: 'Балким',
      declined: 'Баш тартты',
      pending: 'Күтүүдө',
      families: 'Үй-бүлөлөр',
      individuals: 'Жеке',
      total: 'Жалпы',
      familyMembers: 'Үй-бүлө мүчөлөрү',
    },
    venues: {
      findVenue: 'Жай табуу',
      myVenues: 'Менин жайларым',
      addVenue: 'Жай кошуу',
      capacity: 'Сыйымдуулугу',
      price: 'Баасы',
      perHour: 'саатына',
      location: 'Жайгашкан жери',
      contact: 'Байланыш',
      book: 'Брондоо',
      details: 'Деталдар',
    },
    bookings: {
      myBookings: 'Менин брондорум',
      pending: 'Күтүүдө',
      confirmed: 'Ырасталды',
      cancelled: 'Жокко чыгарылды',
      acceptBooking: 'Кабыл алуу',
      declineBooking: 'Баш тартуу',
      chat: 'Чат',
      viewDetails: 'Кененирээк',
    },
    budgetScreen: {
      title: 'Бюджет',
      total: 'Жалпы бюджет',
      spent: 'Коротулду',
      remaining: 'Калдык',
      addExpense: 'Чыгым кошуу',
      venue: 'Жай',
      food: 'Тамак',
      decor: 'Безендирүү',
      music: 'Музыка',
      photo: 'Сүрөт',
      other: 'Башка',
    },
    languages: {
      russian: 'Орусча',
      kyrgyz: 'Кыргызча',
      english: 'Англисче',
    },
  },
  
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      confirm: 'Confirm',
      close: 'Close',
      search: 'Search',
      loading: 'Loading...',
    },
    nav: {
      home: 'Home',
      events: 'Events',
      profile: 'Profile',
      venues: 'Venues',
      bookings: 'Bookings',
    },
    profile: {
      title: 'Profile',
      organizer: 'Event Organizer',
      owner: 'Venue Owner',
      firstName: 'First Name',
      lastName: 'Last Name',
      middleName: 'Middle Name',
      phone: 'Phone',
      email: 'Email',
      photo: 'Photo',
      editProfile: 'Edit Profile',
      settings: 'Settings',
      language: 'App Language',
      support: 'Support',
      logout: 'Log Out',
      logoutConfirm: 'Are you sure you want to log out?',
      appVersion: 'Toi App v1.0',
      rightsReserved: '© 2024 All Rights Reserved',
    },
    settings: {
      title: 'Settings',
      profileSettings: 'Profile Settings',
      accountSettings: 'Account Settings',
      updatePhoto: 'Update Photo',
      deletePhoto: 'Delete Photo',
      changePhone: 'Change Phone',
      changeEmail: 'Change Email',
      notifications: 'Notifications',
      privacy: 'Privacy',
      theme: 'Theme',
      lightTheme: 'Light',
      darkTheme: 'Dark',
      savedSuccessfully: 'Changes saved',
    },
    support: {
      title: 'Support',
      chatWithAI: 'Chat with AI Assistant',
      typeMessage: 'Type a message...',
      send: 'Send',
      faqTitle: 'Frequently Asked Questions',
      faq1: 'How to create an event?',
      faq2: 'How to book a venue?',
      faq3: 'How to add guests?',
      faq4: 'How to manage budget?',
      faq5: 'How to contact venue owner?',
      faq6: 'How to edit profile data?',
      aiGreeting: 'Hello! I\'m your AI assistant in Toi App. How can I help you?',
      aiHelp: 'You can ask me any question about the app or choose one of the frequently asked questions below.',
    },
    events: {
      myEvents: 'My Events',
      createEvent: 'Create Event',
      eventName: 'Event Name',
      eventDate: 'Date',
      eventTime: 'Time',
      guestsCount: 'Guest Count',
      budget: 'Budget',
      eventType: 'Event Type',
      wedding: 'Wedding',
      birthday: 'Birthday',
      corporate: 'Corporate',
      other: 'Other',
      dashboard: 'Event Dashboard',
    },
    guests: {
      title: 'Guests',
      addGuest: 'Add Guest',
      confirmed: 'Confirmed',
      maybe: 'Maybe',
      declined: 'Declined',
      pending: 'Pending',
      families: 'Families',
      individuals: 'Individuals',
      total: 'Total',
      familyMembers: 'Family Members',
    },
    venues: {
      findVenue: 'Find Venue',
      myVenues: 'My Venues',
      addVenue: 'Add Venue',
      capacity: 'Capacity',
      price: 'Price',
      perHour: 'per hour',
      location: 'Location',
      contact: 'Contact',
      book: 'Book',
      details: 'Details',
    },
    bookings: {
      myBookings: 'My Bookings',
      pending: 'Pending',
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
      acceptBooking: 'Accept',
      declineBooking: 'Decline',
      chat: 'Chat',
      viewDetails: 'View Details',
    },
    budgetScreen: {
      title: 'Budget',
      total: 'Total Budget',
      spent: 'Spent',
      remaining: 'Remaining',
      addExpense: 'Add Expense',
      venue: 'Venue',
      food: 'Food',
      decor: 'Decor',
      music: 'Music',
      photo: 'Photo',
      other: 'Other',
    },
    languages: {
      russian: 'Russian',
      kyrgyz: 'Kyrgyz',
      english: 'English',
    },
  },
};

// Хук для использования переводов
export function useTranslations(lang: Language): Translations {
  return translations[lang];
}
