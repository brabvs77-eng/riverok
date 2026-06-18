function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : undefined;
}

function getFbc() {
  const existing = getCookie('_fbc');
  if (existing) return existing;

  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  if (!fbclid) return undefined;

  return 'fb.1.' + Date.now() + '.' + fbclid;
}

function getUserDataForCapi() {
  if (window.RiverokMeta && typeof window.RiverokMeta.getAdvancedMatchingParams === 'function') {
    return window.RiverokMeta.getAdvancedMatchingParams();
  }
  return { country: 'am' };
}

function generateEventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2);
}

async function sendToCapi(eventName, eventId, customData) {
  await fetch('/api/meta-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      fbp: getCookie('_fbp'),
      fbc: getFbc(),
      user_data: getUserDataForCapi(),
      custom_data: customData || {},
    }),
    keepalive: true,
  });
}

async function trackEvent(eventName, customData) {
  const eventId = generateEventId();

  if (typeof fbq === 'function') {
    fbq('track', eventName, customData || {}, { eventID: eventId });
  }

  try {
    await sendToCapi(eventName, eventId, customData);
  } catch {
    /* CAPI unavailable — browser pixel still fires */
  }
}

document.addEventListener('DOMContentLoaded', function () {
  trackEvent('PageView');

  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      const eventName = el.getAttribute('data-track');
      if (eventName) trackEvent(eventName);
    });
  });

  var viewed = false;
  var tournamentSection = document.getElementById('tournaments');
  if (tournamentSection && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !viewed) {
            viewed = true;
            trackEvent('ViewContent', { content_name: 'tournaments' });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(tournamentSection);
  }
});
