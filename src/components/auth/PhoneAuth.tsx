import { useState } from 'react';
import { ArrowLeft, Phone, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { EthnicBorder } from '../EthnicPattern';

interface PhoneAuthProps {
  onVerified: (phone: string) => void;
  onBack: () => void;
}

export function PhoneAuth({ onVerified, onBack }: PhoneAuthProps) {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('+996 ');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    // Keep only digits and +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Start with +996
    if (!cleaned.startsWith('+996')) {
      return '+996 ';
    }
    
    // Format: +996 XXX XXX XXX
    let formatted = '+996 ';
    const digits = cleaned.slice(4);
    
    if (digits.length > 0) {
      formatted += digits.slice(0, 3);
    }
    if (digits.length > 3) {
      formatted += ' ' + digits.slice(3, 6);
    }
    if (digits.length > 6) {
      formatted += ' ' + digits.slice(6, 9);
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const handleSendCode = async () => {
    setError('');
    const cleanPhone = phone.replace(/\s/g, '');
    
    if (cleanPhone.length < 13) {
      setError('Введите корректный номер телефона');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 1500);
  };

  const handleVerifyCode = async () => {
    setError('');
    
    if (code.length !== 6) {
      setError('Код должен содержать 6 цифр');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Simulate successful verification
      if (code === '123456' || code.length === 6) {
        onVerified(phone.replace(/\s/g, ''));
      } else {
        setError('Неверный код');
      }
    }, 1500);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError('');
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
      <div className="flex-1 flex flex-col">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[#3B6EA5] flex items-center justify-center mx-auto mb-6">
            {step === 'phone' ? (
              <Phone className="w-10 h-10 text-white" />
            ) : (
              <Shield className="w-10 h-10 text-white" />
            )}
          </div>
          
          <h2 className="mb-3 text-foreground">
            {step === 'phone' ? 'Введите номер телефона' : 'Введите код'}
          </h2>
          
          <div className="w-20 mx-auto mb-4">
            <EthnicBorder className="text-primary" />
          </div>
          
          <p className="text-muted-foreground">
            {step === 'phone'
              ? 'Мы отправим вам код подтверждения'
              : `Код отправлен на номер ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-foreground">Номер телефона</label>
              <Input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+996 XXX XXX XXX"
                className="py-6 rounded-2xl border-2 focus:border-primary text-center text-xl"
                maxLength={17}
              />
              {error && (
                <p className="mt-2 text-destructive flex items-center justify-center gap-2">
                  <span className="text-xl">⚠️</span>
                  {error}
                </p>
              )}
            </div>

            <Button
              onClick={handleSendCode}
              disabled={loading || phone.replace(/\s/g, '').length < 13}
              className="w-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white py-6 rounded-2xl shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Отправка...
                </div>
              ) : (
                'Получить код'
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-foreground">Код подтверждения</label>
              <Input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={handleCodeChange}
                placeholder="000000"
                className="py-6 rounded-2xl border-2 focus:border-primary text-center text-2xl tracking-widest"
                maxLength={6}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-destructive flex items-center justify-center gap-2">
                  <span className="text-xl">⚠️</span>
                  {error}
                </p>
              )}
              <p className="mt-3 text-center text-muted-foreground">
                Для демо используйте любые 6 цифр
              </p>
            </div>

            <Button
              onClick={handleVerifyCode}
              disabled={loading || code.length !== 6}
              className="w-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white py-6 rounded-2xl shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Проверка...
                </div>
              ) : (
                'Подтвердить'
              )}
            </Button>

            <Button
              onClick={() => setStep('phone')}
              variant="ghost"
              className="w-full text-primary hover:bg-primary/10"
            >
              Изменить номер
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
