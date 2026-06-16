function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : undefined;
}

function generateEventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2);
}

async function trackEvent(eventName, customData) {
  const eventId = generateEventId();

  if (typeof fbq === 'function') {
    fbq('track', eventName, customData || {}, { eventID: eventId });
  }

  try {
    await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
        custom_data: customData || {},
      }),
      keepalive: true,
    });
  } catch {
    /* CAPI unavailable — browser pixel still fires */
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      const eventName = el.getAttribute('data-track');
      if (eventName) trackEvent(eventName);
    });
  });

  var viewed = false;
  var tournamentSection = document.getElementById('tournaments');
  if (tournamentSection && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !viewed) {
          viewed = true;
          trackEvent('ViewContent', { content_name: 'tournaments' });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(tournamentSection);
  }
});
