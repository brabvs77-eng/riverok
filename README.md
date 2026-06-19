# Riverok Club Landing

Маркетинговый лендинг для PPPoker-клуба **Riverok_club** (Club ID: `2653839`).

**Домен:** https://riverok.aspriter.am

## Стек

- [Astro](https://astro.build) — статический сайт
- Tailwind CSS v4 — стили
- Cloudflare Pages — хостинг + Functions (Meta Conversions API)

## Языки

- `/` — армянский (по умолчанию)
- `/ru/` — русский
- `/en/` — английский

## Локальная разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Результат в папке `dist/`.

## Деплой на Cloudflare Pages

1. Подключите репозиторий к Cloudflare Pages
2. Настройки сборки:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 22+
3. Добавьте переменные окружения (Settings → Environment variables):

| Переменная | Описание |
|------------|----------|
| `META_PIXEL_ID` | `4451322711789343` |
| `META_ACCESS_TOKEN` | Conversions API access token (секрет) |

4. Привяжите домен `riverok.aspriter.am` в Cloudflare Pages → Custom domains

## Meta Pixel + Conversions API

Гибридная схема: каждое событие отправляется **и через browser Pixel, и через CAPI** с одинаковым `event_id` — Meta автоматически дедуплицирует пары в течение 48 часов.

### Manual Advanced Matching

Pixel инициализируется с третьим параметром `fbq('init', pixelId, { ... })`:

```javascript
fbq('init', '4451322711789343', {
  country: 'am',
  external_id: '<visitor-uuid>',
  // em, ph, fn, ln — если доступны
});
```

- Pixel **сам хэширует** поля SHA-256 перед отправкой
- CAPI получает те же поля и хэширует их на сервере
- По умолчанию: `country: 'am'` + анонимный `external_id` (localStorage)
- Чтобы добавить email/телефон позже (например, из Telegram-бота):

```javascript
RiverokMeta.setUserData({ em: 'user@email.com', ph: '37499123456' });
```

- `PageView` — при загрузке страницы (Pixel + CAPI)
- CTA-клики — Pixel + CAPI с общим `event_id`
- `fbclid` из URL рекламы конвертируется в `fbc` для лучшей атрибуции
- Endpoint: `POST /api/meta-events` (Cloudflare Function)

### Проверка дедупликации

1. Meta Events Manager → **Test Events**
2. Откройте сайт и кликните CTA
3. Должно быть **1 событие** (не 2) с пометкой deduplicated / received from browser and server

### Отслеживаемые события

| Событие | Триггер |
|---------|---------|
| `PageView` | Загрузка страницы |
| `ViewContent` | Просмотр блока турниров |
| `Lead` | Клик «Написать менеджеру» |
| `InitiateCheckout` | Клик «Депозит» / Telegram-бот |
| `Contact` | Копирование Club ID |
| `CompleteRegistration` | Клик App Store / Google Play |

## Конфигурация клуба

Все данные клуба в `src/lib/club.config.ts`:

- Club ID: `2653839`
- Курс: 1 chip = 500 AMD
- Telegram-бот: [@Riverok_clubbot](https://t.me/Riverok_clubbot)
- Менеджер: [@Riverok_club_manager](https://t.me/Riverok_club_manager)
- Расписание турниров: https://t.ly/4EHW3

## Логотип и фавикон

| Файл | Назначение |
|------|------------|
| `public/logo.png` | Основной логотип клуба (из `ривер лого.png`) |
| `public/favicon-32.png` / `favicon-16.png` | Фавикон (вырезка пики) |
| `public/apple-touch-icon.png` | Иконка для iOS |
| `public/og-image.jpg` | Open Graph превью |
