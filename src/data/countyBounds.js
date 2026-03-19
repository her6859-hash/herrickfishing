// Lat/lng bounding boxes for the three target counties in NW Pennsylvania
// Format: [[southLat, westLng], [northLat, eastLng]]

export const countyBounds = {
  erie: {
    bounds: [[41.85, -80.52], [42.27, -79.76]],
    center: [42.11, -80.13],
    zoom: 11,
    fips: '049',
    name: 'Erie County',
  },
  warren: {
    bounds: [[41.62, -79.52], [42.00, -78.94]],
    center: [41.84, -79.25],
    zoom: 11,
    fips: '123',
    name: 'Warren County',
  },
  crawford: {
    bounds: [[41.37, -80.52], [41.85, -79.90]],
    center: [41.63, -80.10],
    zoom: 11,
    fips: '039',
    name: 'Crawford County',
  },
};

// Default view showing all three counties
export const defaultView = {
  center: [41.88, -80.10],
  zoom: 10,
};
