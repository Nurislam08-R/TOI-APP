import { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { EthnicBorder } from './EthnicPattern';
import { Venue } from '../App';

interface AddVenueScreenProps {
  onComplete: (venue: Omit<Venue, 'id'>) => void;
  onBack: () => void;
  userId: string;
}

const VENUE_TYPES = [
  'Банкетный зал',
  'Ресторан',
  'Кафе',
  'Юрта',
  'Летняя площадка',
  'Конференц-зал',
  'Отель',
];

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1542665952-14513db15293?w=800',
  'https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?w=800',
  'https://images.unsplash.com/photo-1592240419090-5d933c5a759b?w=800',
];

export function AddVenueScreen({ onComplete, onBack, userId }: AddVenueScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    capacity: '',
    address: '',
    description: '',
    phone: '+996 ',
    whatsapp: '+996 ',
    photos: [] as string[],
    mainPhoto: '',
    location: {
      lat: 42.8746,
      lng: 74.5698,
    }
  });
  const [errors, setErrors] = useState<any>({});

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+996')) {
      return '+996 ';
    }
    
    let formatted = '+996 ';
    const digits = cleaned.slice(4);
    
    if (digits.length > 0) formatted += digits.slice(0, 3);
    if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
    if (digits.length > 6) formatted += ' ' + digits.slice(6, 9);
    
    return formatted;
  };

  const validateStep = (currentStep: number) => {
    const newErrors: any = {};
    
    if (currentStep === 1) {
      if (!formData.name || formData.name.length < 3) {
        newErrors.name = 'Введите название заведения (минимум 3 символа)';
      }
      if (!formData.type) {
        newErrors.type = 'Выберите тип заведения';
      }
      if (!formData.price || parseFloat(formData.price) <= 0) {
        newErrors.price = 'Введите корректную цену';
      }
      if (!formData.capacity || parseInt(formData.capacity) <= 0) {
        newErrors.capacity = 'Введите вместимость';
      }
    }

    if (currentStep === 2) {
      if (!formData.address || formData.address.length < 5) {
        newErrors.address = 'Введите адрес заведения';
      }
      if (!formData.description || formData.description.length < 20) {
        newErrors.description = 'Добавьте описание (минимум 20 символов)';
      }
    }

    if (currentStep === 3) {
      const cleanPhone = formData.phone.replace(/\s/g, '');
      if (cleanPhone.length < 13) {
        newErrors.phone = 'Введите корректный номер телефона';
      }
      const cleanWhatsapp = formData.whatsapp.replace(/\s/g, '');
      if (cleanWhatsapp.length < 13) {
        newErrors.whatsapp = 'Введите корректный номер WhatsApp';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const venueData: Omit<Venue, 'id'> = {
      name: formData.name,
      type: formData.type,
      price: parseFloat(formData.price),
      capacity: parseInt(formData.capacity),
      location: {
        lat: formData.location.lat,
        lng: formData.location.lng,
        address: formData.address,
      },
      description: formData.description,
      photos: formData.photos.length > 0 ? formData.photos : SAMPLE_PHOTOS,
      mainPhoto: formData.mainPhoto || SAMPLE_PHOTOS[0],
      ownerId: userId,
      whatsapp: formData.whatsapp.replace(/\s/g, ''),
      phone: formData.phone.replace(/\s/g, ''),
    };
    onComplete(venueData);
  };

  const handleAddPhoto = () => {
    // Simulate photo upload - use sample photos
    const availablePhotos = SAMPLE_PHOTOS.filter(p => !formData.photos.includes(p));
    if (availablePhotos.length > 0) {
      const newPhotos = [...formData.photos, availablePhotos[0]];
      setFormData({
        ...formData,
        photos: newPhotos,
        mainPhoto: formData.mainPhoto || availablePhotos[0]
      });
    }
  };

  const setMainPhoto = (photo: string) => {
    setFormData({ ...formData, mainPhoto: photo });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-[#2A5A8A] pt-8 pb-6 px-6 rounded-b-3xl mb-6">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <h1 className="text-white mb-3">Добавить заведение</h1>
        
        <div className="w-20 mb-4">
          <EthnicBorder className="text-accent" />
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-accent' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <p className="text-white/80 mt-2">
          Шаг {step} из 4
        </p>
      </div>

      <div className="px-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-foreground mb-2">Основная информация</h2>
              <p className="text-muted-foreground">
                Укажите название и тип заведения
              </p>
            </div>

            <div>
              <label className="block mb-2 text-foreground">Название заведения *</label>
              <Input
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: '' });
                }}
                placeholder="Например: Ресторан Ала-Арча"
                className="py-6 rounded-2xl border-2 focus:border-accent"
              />
              {errors.name && (
                <p className="mt-2 text-destructive flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-foreground">Тип заведения *</label>
              <Select value={formData.type} onValueChange={(value) => {
                setFormData({ ...formData, type: value });
                setErrors({ ...errors, type: '' });
              }}>
                <SelectTrigger className="py-6 rounded-2xl border-2 focus:border-accent">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  {VENUE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="mt-2 text-destructive flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.type}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-foreground">Цена аренды (сом) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    setErrors({ ...errors, price: '' });
                  }}
                  placeholder="50000"
                  className="py-6 rounded-2xl border-2 focus:border-accent"
                />
                {errors.price && (
                  <p className="mt-2 text-destructive flex items-center gap-2">
                    <span>⚠️</span>
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-foreground">Вместимость (чел) *</label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => {
                    setFormData({ ...formData, capacity: e.target.value });
                    setErrors({ ...errors, capacity: '' });
                  }}
                  placeholder="100"
                  className="py-6 rounded-2xl border-2 focus:border-accent"
                />
                {errors.capacity && (
                  <p className="mt-2 text-destructive flex items-center gap-2">
                    <span>⚠️</span>
                    {errors.capacity}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location & Description */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-foreground mb-2">Локация и описание</h2>
              <p className="text-muted-foreground">
                Укажите адрес и опишите ваше заведение
              </p>
            </div>

            <div>
              <label className="block mb-2 text-foreground">Адрес *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    setErrors({ ...errors, address: '' });
                  }}
                  placeholder="г. Бишкек, ул. Абая 123"
                  className="pl-12 py-6 rounded-2xl border-2 focus:border-accent"
                />
              </div>
              {errors.address && (
                <p className="mt-2 text-destructive flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-foreground">Описание *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  setErrors({ ...errors, description: '' });
                }}
                placeholder="Опишите ваше заведение: интерьер, услуги, особенности..."
                className="min-h-32 rounded-2xl border-2 focus:border-accent resize-none"
                rows={6}
              />
              <p className="mt-2 text-muted-foreground">
                {formData.description.length} / 20 минимум
              </p>
              {errors.description && (
                <p className="mt-2 text-destructive flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.description}
                </p>
              )}
            </div>

            {/* Map Preview */}
            <div className="bg-muted rounded-2xl p-6 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">
                Карта: Бишкек
              </p>
              <p className="text-foreground">
                {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Contacts */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-foreground mb-2">Контактная информация</h2>
              <p className="text-muted-foreground">
                Укажите номера для связи с вами
              </p>
            </div>

            <div>
              <label className="block mb-2 text-foreground">Номер телефона *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: formatPhone(e.target.value) });
                    setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="+996 XXX XXX XXX"
                  className="pl-12 py-6 rounded-2xl border-2 focus:border-accent"
                  maxLength={17}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-destructive flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-foreground">WhatsApp *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#25D366]" />
                <Input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => {
                    setFormData({ ...formData, whatsapp: formatPhone(e.target.value) });
                    setErrors({ ...errors, whatsapp: '' });
                  }}
                  placeholder="+996 XXX XXX XXX"
                  className="pl-12 py-6 rounded-2xl border-2 focus:border-accent"
                  maxLength={17}
                />
              </div>
              {errors.whatsapp && (
                <p className="mt-2 text-destructive flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.whatsapp}
                </p>
              )}
              <p className="mt-2 text-muted-foreground">
                Организаторы смогут связаться с вами через WhatsApp
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Photos */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-foreground mb-2">Фотографии</h2>
              <p className="text-muted-foreground">
                Загрузите до 10 фотографий вашего заведения
              </p>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleAddPhoto}
              disabled={formData.photos.length >= 10}
              className="w-full py-8 rounded-2xl border-2 border-dashed border-muted-foreground/30 hover:border-accent hover:bg-accent/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-foreground">Нажмите для добавления фото</p>
              <p className="text-muted-foreground">
                {formData.photos.length} / 10
              </p>
            </button>

            {/* Photo Grid */}
            {formData.photos.length > 0 && (
              <div>
                <label className="block mb-3 text-foreground">Загруженные фото</label>
                <div className="grid grid-cols-2 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div
                      key={index}
                      onClick={() => setMainPhoto(photo)}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${
                        formData.mainPhoto === photo
                          ? 'border-accent scale-95'
                          : 'border-transparent hover:border-accent/30'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {formData.mainPhoto === photo && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-accent text-white rounded-lg">
                          Главное
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-muted-foreground text-center">
                  Нажмите на фото, чтобы сделать его главным
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="flex-1 py-6 rounded-2xl border-2"
            >
              Назад
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-accent to-[#B88A16] hover:from-accent/90 hover:to-[#B88A16]/90 text-white py-6 rounded-2xl shadow-lg"
          >
            {step === 4 ? 'Опубликовать' : 'Далее'}
          </Button>
        </div>
      </div>
    </div>
  );
}
