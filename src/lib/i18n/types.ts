export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    howToStart: string;
    tournaments: string;
    calculator: string;
    deposit: string;
    support: string;
    ctaDeposit: string;
    ctaManager: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    clubIdLabel: string;
    copy: string;
    copied: string;
    chipRate: string;
  };
  stats: {
    players: string;
    chips: string;
    support: string;
  };
  tournament: {
    badge: string;
    title: string;
    description: string;
    cta: string;
  };
  howToStart: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
    appStore: string;
    googlePlay: string;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  banks: {
    title: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    quickSelect: string;
    amdLabel: string;
    chipsLabel: string;
    deposit: string;
    presets: string[];
  };
  deposit: {
    title: string;
    subtitle: string;
    steps: string[];
    openBot: string;
    writeManager: string;
    fast: string;
    ssl: string;
    instant: string;
  };
  support: {
    title: string;
    subtitle: string;
    manager: { title: string; role: string };
    bot: { title: string; role: string };
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
  footer: {
    disclaimer: string;
    rights: string;
  };
}
