var appCache = window.applicationCache;

  appCache.update(); // Attempt to update the user's cache.


  switch (appCache.status) {
    case appCache.UNCACHED: // UNCACHED == 0
      return 'UNCACHED';
    case appCache.IDLE: // IDLE == 1
      return 'IDLE';
    case appCache.CHECKING: // CHECKING == 2
      return 'CHECKING';
    case appCache.DOWNLOADING: // DOWNLOADING == 3
      return 'DOWNLOADING';
    case appCache.UPDATEREADY:  // UPDATEREADY == 4
      return 'UPDATEREADY';
    case appCache.OBSOLETE: // OBSOLETE == 5
      return 'OBSOLETE';
    default:
      return 'UKNOWN CACHE STATUS';
  }

  if (appCache.status == window.applicationCache.UPDATEREADY) {
    appCache.swapCache();  // The fetch was successful, swap in the new cache.
  }
