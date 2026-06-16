import type { Translations } from './types';

const ru: Translations = {
  meta: {
    title: 'Riverok Club | Покер в Армении | PPPoker Club 2653839',
    description:
      'Riverok Club — ведущий PPPoker клуб в Армении. Мгновенный депозит через Telegram, ежедневные турниры, поддержка 24/7. Club ID: 2653839',
  },
  nav: {
    howToStart: 'Как начать',
    tournaments: 'Турниры',
    calculator: 'Калькулятор',
    deposit: 'Депозит',
    support: 'Поддержка',
    ctaDeposit: 'Депозит',
    ctaManager: 'Написать менеджеру',
  },
  hero: {
    eyebrow: 'PPPoker Club • Армения',
    title: 'Играйте в покер в клубе Riverok',
    subtitle: 'Ежедневные турниры • Мгновенный депозит • Поддержка 24/7',
    clubIdLabel: 'Club ID',
    copy: 'Копировать',
    copied: 'Скопировано!',
    chipRate: '1 чип = 500 драм',
  },
  stats: {
    players: 'Игроков',
    chips: 'Чипов/день',
    support: 'Поддержка',
  },
  tournament: {
    badge: 'Новое',
    title: 'Расписание турниров на неделю опубликовано',
    description: 'Смотрите полное расписание и присоединяйтесь к турнирам',
    cta: 'Смотреть расписание',
  },
  howToStart: {
    title: 'Как начать',
    subtitle: '3 простых шага до первой игры',
    steps: [
      {
        title: 'Скачать PPPoker',
        description: 'Скачайте приложение PPPoker из App Store или Google Play бесплатно.',
      },
      {
        title: 'Войти в клуб',
        description: 'Откройте PPPoker, выберите раздел «Клуб» и введите Club ID: 2653839',
      },
      {
        title: 'Играть и побеждать',
        description: 'Пополните счёт через Telegram-бот и начните играть. 1 чип = 500 драм.',
      },
    ],
    appStore: 'App Store',
    googlePlay: 'Google Play',
  },
  features: {
    eyebrow: 'Почему Riverok',
    title: 'Всё, что вам нужно',
    subtitle: 'Безопасно, удобно, по-армянски',
    items: [
      {
        title: 'Защищённая игра',
        description: 'SSL-шифрование, античит-система, 100% безопасная игра',
      },
      {
        title: 'Мгновенные транзакции',
        description: 'Депозит и вывод за 5 минут из любого армянского банка',
      },
      {
        title: 'Все армянские банки',
        description: 'Ameria, Ineco, Ardshinbank, ACBA, VTB, Inecobank и другие',
      },
      {
        title: 'Ежедневные турниры',
        description: 'Cash game, Tournament, Sit & Go — все форматы каждый день',
      },
      {
        title: 'VIP программа',
        description: 'Накапливайте бонусы, получайте cashback и VIP-привилегии',
      },
      {
        title: 'iOS & Android',
        description: 'Современное приложение для iPhone и Android',
      },
    ],
  },
  banks: {
    title: 'Принимаемые банки',
  },
  calculator: {
    title: 'Калькулятор чипов',
    subtitle: 'Рассчитайте депозит мгновенно',
    quickSelect: 'Быстрый выбор',
    amdLabel: 'AMD (Армянский драм)',
    chipsLabel: 'PPPoker Chips',
    deposit: 'Депозит',
    presets: ['2500', '10000', '25000', '50000', '100000'],
  },
  deposit: {
    title: 'Пополните счёт в 1 клик',
    subtitle: 'Через Telegram-бот быстро, безопасно, из любого банка',
    steps: [
      'Запустить @Riverok_clubbot',
      'Выбрать кнопку «Депозит»',
      'Ввести сумму (1 chip = 500 ֏)',
      'Перевести из вашего банка',
      'Получить чипы мгновенно',
    ],
    openBot: 'Открыть @Riverok_clubbot',
    writeManager: 'Написать менеджеру',
    fast: 'Менее 5 минут',
    ssl: 'SSL Шифрование',
    instant: 'Мгновенное зачисление',
  },
  support: {
    title: 'Поддержка 24/7',
    subtitle: 'Наша команда всегда готова помочь',
    manager: {
      title: 'Riverok Club Manager',
      role: 'Вопросы по игре, депозиту и выводу средств',
    },
    bot: {
      title: 'Riverok Club Bot',
      role: 'Автоматический депозит и вывод 24/7',
    },
    faqTitle: 'Частые вопросы',
    faq: [
      { q: 'Как начать играть?', a: 'Скачайте PPPoker, введите Club ID 2653839 и пополните через Telegram-бот.' },
      { q: 'Как сделать депозит?', a: 'Откройте @Riverok_clubbot, выберите «Депозит» и следуйте инструкциям.' },
      { q: 'Какие банки принимаются?', a: 'Все армянские банки: Ameriabank, Ineco, ACBA, VTB и другие.' },
      { q: 'Безопасны ли мои деньги?', a: 'Да, все транзакции защищены SSL-шифрованием.' },
      { q: 'Как вывести выигрыш?', a: 'Напишите @Riverok_club_manager или используйте функцию «Вывод» в боте.' },
    ],
  },
  footer: {
    disclaimer:
      'Riverok Club — независимый PPPoker клуб. Виртуальные чипы, социальная игра. 18+',
    rights: 'Все права защищены',
  },
};

export default ru;
