/**
 * Calendly Event Listener Helper
 * Loaded by the Calendly Event Tracker GTM template via injectScript.
 * Registers a postMessage listener that filters Calendly events and pushes them to the dataLayer.
 */
(function() {
  var config = window._calendlyTrackerConfig;
  if (!config) return;

  // Prevent duplicate listener registration
  if (window._calendlyListenerRegistered) return;

  window.addEventListener('message', function(e) {
    if (!e || !e.data || !e.data.event) return;

    var eventFull = String(e.data.event);

    // Only process Calendly events (format: "calendly.<event_name>")
    if (eventFull.indexOf('calendly.') !== 0) return;

    var eventName = eventFull.split('.')[1];

    // Check if this event is in the allowed list
    if (!config.allowedEvents[eventName]) return;

    // Deduplication check
    if (config.enableDeduplication) {
      window._calendlyFiredEvents = window._calendlyFiredEvents || {};

      if (window._calendlyFiredEvents[eventName]) return;

      window._calendlyFiredEvents[eventName] = true;
    }

    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': config.dataLayerEventName,
      'calendly_event': eventName
    });
  });

  window._calendlyListenerRegistered = true;
})();
