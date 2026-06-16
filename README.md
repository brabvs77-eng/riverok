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

- Browser Pixel загружается на всех страницах (`PageView`)
- CTA-клики отправляют события через Pixel + server-side CAPI с дедупликацией по `event_id`
- Endpoint: `POST /api/meta-events` (Cloudflare Function)

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
| `public/logo.svg` | Полный квадратный логотип (шапка hero, Apple Touch Icon) |
| `public/logo-horizontal.svg` | Горизонтальный вариант для header |
| `public/favicon.svg` | Фавикон — пика на тёмно-зелёном фоне |

Чтобы заменить на оригинальный PNG/JPG логотип, положите файл в `public/logo.png` и обновите пути в компонентах.
