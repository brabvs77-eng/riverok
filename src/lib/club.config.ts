export const clubConfig = {
  name: 'Riverok Club',
  brand: 'Riverok_club',
  slug: 'riverok',
  clubId: '2653839',
  chipRate: 500,
  domain: 'https://riverok.aspriter.am',
  tournamentScheduleUrl: 'https://t.ly/4EHW3',
  telegram: {
    bot: '@Riverok_clubbot',
    botUrl: 'https://t.me/Riverok_clubbot',
    manager: '@Riverok_club_manager',
    managerUrl: 'https://t.me/Riverok_club_manager',
  },
  meta: {
    pixelId: '4451322711789343',
  },
  stores: {
    appStore: 'https://apps.apple.com/app/pppoker-home-games/id1101445405',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.lein.pppoker.android',
  },
  stats: {
    players: '500+',
    chipsPerDay: '2000+',
    support: '24/7',
  },
  banks: [
    { code: 'AMR', name: 'Ameriabank' },
    { code: 'INC', name: 'Ineco' },
    { code: 'ARD', name: 'Ardshinbank' },
    { code: 'ACB', name: 'ACBA' },
    { code: 'VTB', name: 'VTB Armenia' },
    { code: 'INB', name: 'Inecobank' },
    { code: 'UNI', name: 'Unibank' },
    { code: 'EVO', name: 'Evocabank' },
  ],
} as const;

export type Lang = 'hy' | 'ru' | 'en';

export const languages: { code: Lang; label: string; href: string }[] = [
  { code: 'hy', label: 'Հայ', href: '/' },
  { code: 'ru', label: 'Рус', href: '/ru/' },
  { code: 'en', label: 'Eng', href: '/en/' },
];
