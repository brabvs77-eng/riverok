(function () {
  var STORAGE_KEY = 'riverok_meta_match';
  var VISITOR_KEY = 'riverok_vid';
  var MATCH_FIELDS = ['em', 'ph', 'fn', 'ln', 'ct', 'st', 'zp', 'country', 'external_id', 'ge', 'db'];

  function getVisitorId() {
    try {
      var id = localStorage.getItem(VISITOR_KEY);
      if (!id) {
        id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : 'vid_' + Date.now() + '_' + Math.random().toString(36).slice(2);
        localStorage.setItem(VISITOR_KEY, id);
      }
      return id;
    } catch {
      return 'vid_' + Date.now();
    }
  }

  function normalizePhone(phone) {
    return String(phone).replace(/\D/g, '');
  }

  function normalizeEmail(email) {
    return String(email).toLowerCase().trim();
  }

  function pickMatchingFields(data) {
    var result = {};
    if (!data || typeof data !== 'object') return result;

    MATCH_FIELDS.forEach(function (field) {
      var value = data[field];
      if (!value) return;

      if (field === 'em') result.em = normalizeEmail(value);
      else if (field === 'ph') result.ph = normalizePhone(value);
      else if (field === 'country') result.country = String(value).toLowerCase().trim();
      else result[field] = String(value).trim();
    });

    return result;
  }

  function getStoredUserData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function getAdvancedMatchingParams() {
    var params = pickMatchingFields(getStoredUserData());

    if (!params.country) params.country = 'am';
    if (!params.external_id) params.external_id = getVisitorId();

    return params;
  }

  function setUserData(data) {
    var current = getStoredUserData();
    var next = Object.assign({}, current, pickMatchingFields(data));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }

    if (typeof fbq === 'function' && window.__metaPixelId) {
      fbq('init', window.__metaPixelId, getAdvancedMatchingParams());
    }

    return next;
  }

  window.RiverokMeta = {
    getAdvancedMatchingParams: getAdvancedMatchingParams,
    getVisitorId: getVisitorId,
    setUserData: setUserData,
    MATCH_FIELDS: MATCH_FIELDS,
  };
})();
