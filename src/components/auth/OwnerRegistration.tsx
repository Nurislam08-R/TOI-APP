import { useState } from 'react';
import { ArrowLeft, Camera, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { EthnicBorder } from '../EthnicPattern';

interface OwnerRegistrationProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function OwnerRegistration({ onComplete, onBack }: OwnerRegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '+996 ',
    email: '',
    photoUrl: ''
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

  const validate = () => {
    const newErrors: any = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    if (!formData.surname || formData.surname.length < 2) {
      newErrors.surname = 'Фамилия должна содержать минимум 2 символа';
    }
    
    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (cleanPhone.length < 13) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный адрес электронной почты';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onComplete({
        ...formData,
        phone: formData.phone.replace(/\s/g, '')
      });
    }
  };

  const handlePhotoUpload = () => {
    setFormData({
      ...formData,
      photoUrl: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.name || 'Owner') + '&background=D4A017&color=fff&size=200'
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full mb-6">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="text-center mb-8">
          <h2 className="mb-3 text-foreground">
            Регистрация владельца
          </h2>
          
          <div className="w-20 mx-auto mb-4">
            <EthnicBorder className="text-accent" />
          </div>
          
          <p className="text-muted-foreground">
            Заполните обязательные поля
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo upload */}
          <div className="flex flex-col items-center mb-8">
            <div
              onClick={handlePhotoUpload}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-[#B88A16] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform mb-3 relative overflow-hidden"
            >
              {formData.photoUrl ? (
                <img src={formData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-12 h-12 text-white" />
              )}
            </div>
            <Button
              type="button"
              onClick={handlePhotoUpload}
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              {formData.photoUrl ? 'Изменить фото' : 'Загрузить фото'}
            </Button>
            <p className="text-muted-foreground mt-2">Рекомендуется</p>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-foreground">Имя *</label>
            <Input
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
              placeholder="Введите ваше имя"
              className="py-6 rounded-2xl border-2 focus:border-accent"
            />
            {errors.name && (
              <p className="mt-2 text-destructive flex items-center gap-2">
                <span>⚠️</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Surname */}
          <div>
            <label className="block mb-2 text-foreground">Фамилия *</label>
            <Input
              value={formData.surname}
              onChange={(e) => {
                setFormData({ ...formData, surname: e.target.value });
                setErrors({ ...errors, surname: '' });
              }}
              placeholder="Введите вашу фамилию"
              className="py-6 rounded-2xl border-2 focus:border-accent"
            />
            {errors.surname && (
              <p className="mt-2 text-destructive flex items-center gap-2">
                <span>⚠️</span>
                {errors.surname}
              </p>
            )}
          </div>

          {/* Phone */}
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

          {/* Email */}
          <div>
            <label className="block mb-2 text-foreground">Email *</label>
            <Input
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              placeholder="Введите ваш email"
              className="py-6 rounded-2xl border-2 focus:border-accent"
            />
            {errors.email && (
              <p className="mt-2 text-destructive flex items-center gap-2">
                <span>⚠️</span>
                {errors.email}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-[#B88A16] hover:from-accent/90 hover:to-[#B88A16]/90 text-white py-6 rounded-2xl shadow-lg mt-8"
          >
            Завершить регистрацию
          </Button>
        </form>
      </div>
    </div>
  );
}