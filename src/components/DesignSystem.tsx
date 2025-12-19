import { ArrowLeft, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { EthnicPattern, EthnicBorder } from './EthnicPattern';

interface DesignSystemProps {
  onBack: () => void;
}

export function DesignSystem({ onBack }: DesignSystemProps) {
  const colors = [
    { name: 'Primary (Turquoise)', value: '#1FB6B4', var: '--toi-turquoise' },
    { name: 'Gold', value: '#D4A017', var: '--toi-gold' },
    { name: 'Warm Blue', value: '#3B6EA5', var: '--toi-warm-blue' },
    { name: 'Sky Blue', value: '#A7D8F0', var: '--toi-sky-blue' },
    { name: 'Dark Red', value: '#B33A3A', var: '--toi-dark-red' },
    { name: 'Light Background', value: '#FCFBF9', var: '--toi-light-bg' },
    { name: 'Dark Background', value: '#0F1720', var: '--toi-dark-bg' }
  ];

  const typography = [
    { name: 'H1 - Headers', tag: 'h1', text: 'Toi App - Главный заголовок' },
    { name: 'H2 - Section Headers', tag: 'h2', text: 'Организуй свой Той' },
    { name: 'H3 - Subsections', tag: 'h3', text: 'Рекомендованные площадки' },
    { name: 'H4 - Card Titles', tag: 'h4', text: 'Ала-Тоо Plaza' },
    { name: 'P - Body Text', tag: 'p', text: 'Элегантный зал для торжественных мероприятий' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-[#3B6EA5] text-white px-6 py-6 sticky top-0 z-10">
        <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <Palette className="w-8 h-8" />
          <div>
            <h1>Design System</h1>
            <p className="text-[#A7D8F0]">Toi App Style Guide</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-12">
        {/* Brand Colors */}
        <section>
          <h2 className="mb-6 text-foreground">Цветовая палитра</h2>
          <div className="grid grid-cols-2 gap-4">
            {colors.map((color, index) => (
              <div key={index} className="bg-card rounded-2xl p-4 shadow-sm">
                <div
                  className="w-full h-20 rounded-xl mb-3 shadow-inner"
                  style={{ backgroundColor: color.value }}
                ></div>
                <h4 className="text-card-foreground mb-1">{color.name}</h4>
                <p className="text-muted-foreground">{color.value}</p>
                <code className="text-xs text-primary">{color.var}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="mb-6 text-foreground">Типографика</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm space-y-6">
            {typography.map((type, index) => {
              const Tag = type.tag as keyof JSX.IntrinsicElements;
              return (
                <div key={index} className="pb-4 border-b border-border last:border-0">
                  <p className="text-muted-foreground mb-2">{type.name}</p>
                  <Tag className="text-card-foreground">{type.text}</Tag>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ethnic Patterns */}
        <section>
          <h2 className="mb-6 text-foreground">Этнические узоры</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <p className="text-muted-foreground mb-3">Pattern - Koshka Muiz</p>
              <div className="text-primary">
                <EthnicPattern className="w-full h-24" />
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <p className="text-muted-foreground mb-3">Border Decoration</p>
              <EthnicBorder className="text-accent" />
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="mb-6 text-foreground">Кнопки</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <p className="text-muted-foreground mb-2">Primary Button</p>
              <Button className="w-full bg-gradient-to-r from-primary to-[#3B6EA5] hover:from-primary/90 hover:to-[#3B6EA5]/90 text-white py-6 rounded-2xl">
                Создать мероприятие
              </Button>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Accent Button</p>
              <Button className="w-full bg-gradient-to-r from-accent to-[#B88A16] hover:from-accent/90 hover:to-[#B88A16]/90 text-white py-6 rounded-2xl">
                Золотая кнопка
              </Button>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Outline Button</p>
              <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary/5 py-6 rounded-2xl">
                Найти площадку
              </Button>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Destructive Button</p>
              <Button variant="outline" className="w-full border-2 border-destructive text-destructive hover:bg-destructive/10 py-6 rounded-2xl">
                Удалить
              </Button>
            </div>
          </div>
        </section>

        {/* Input Fields */}
        <section>
          <h2 className="mb-6 text-foreground">Поля ввода</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block mb-2 text-card-foreground">Standard Input</label>
              <Input
                placeholder="Введите текст..."
                className="py-6 rounded-2xl border-2 focus:border-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-card-foreground">Phone Input</label>
              <Input
                type="tel"
                placeholder="+996 XXX XXX XXX"
                className="py-6 rounded-2xl border-2 focus:border-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-card-foreground">Email Input</label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                className="py-6 rounded-2xl border-2 focus:border-accent"
              />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="mb-6 text-foreground">Карточки</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <h4 className="text-card-foreground mb-2">Standard Card</h4>
              <p className="text-muted-foreground">
                Стандартная карточка с тенью и скругленными углами (16px radius)
              </p>
            </div>
            <div className="bg-card rounded-3xl p-6 shadow-lg">
              <h4 className="text-card-foreground mb-2">Large Card</h4>
              <p className="text-muted-foreground">
                Большая карточка с увеличенной тенью (24px radius)
              </p>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="mb-6 text-foreground">Интервалы</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground mb-2">Small (4px)</p>
                <div className="h-1 w-4 bg-primary rounded"></div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Medium (8px)</p>
                <div className="h-2 w-8 bg-primary rounded"></div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Large (16px)</p>
                <div className="h-4 w-16 bg-primary rounded"></div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">XLarge (24px)</p>
                <div className="h-6 w-24 bg-primary rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Radius */}
        <section>
          <h2 className="mb-6 text-foreground">Скругления</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-2">Small (8px)</p>
                <div className="h-16 bg-primary rounded-lg"></div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Medium (12px)</p>
                <div className="h-16 bg-primary rounded-xl"></div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Large (16px)</p>
                <div className="h-16 bg-primary rounded-2xl"></div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">XLarge (24px)</p>
                <div className="h-16 bg-primary rounded-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section>
          <h2 className="mb-6 text-foreground">Тени</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <p className="text-muted-foreground">Small Shadow</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-md">
              <p className="text-muted-foreground">Medium Shadow</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <p className="text-muted-foreground">Large Shadow</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-xl">
              <p className="text-muted-foreground">XLarge Shadow</p>
            </div>
          </div>
        </section>

        {/* Animations */}
        <section>
          <h2 className="mb-6 text-foreground">Анимации</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <p className="text-muted-foreground mb-2">Hover Scale (1.02)</p>
              <Button className="bg-primary hover:scale-[1.02] transition-transform">
                Наведите на меня
              </Button>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Active Scale (0.98)</p>
              <Button className="bg-primary active:scale-[0.98] transition-transform">
                Нажмите на меня
              </Button>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Smooth Transition (300ms)</p>
              <div className="w-20 h-20 bg-primary rounded-2xl transition-all duration-300 hover:bg-accent hover:rounded-full"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
