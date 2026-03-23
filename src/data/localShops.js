// Local fly shops / bait & tackle shops near Erie, PA
export const localShopsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.2364, 41.9854] },
      properties: {
        name: "Folly's End Campground & Fly Shop",
        type: 'Fly Shop / Campground',
        address: '8600 Route 98, Girard, PA 16417',
        phone: '(814) 474-5730',
        website: 'https://www.follysend.com',
        description: 'Full-line fly shop directly on Elk Creek — PA\'s largest Lake Erie trib. Steelhead focus. Camping on-site, 2 waterfalls, 1.5-mi loop trail.',
        species: 'Steelhead, Brown Trout',
        icon: '🪶',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.2380, 42.0092] },
      properties: {
        name: "Poor Richard's Bait & Tackle",
        type: 'Bait & Tackle',
        address: '6821 W Lake Rd (Route 5), Fairview, PA 16415',
        phone: '(814) 474-5623',
        website: 'https://www.poorrichardsfishing.com',
        description: 'On the south side of Route 5, ~½ mile west of Walnut Creek. Live bait, tackle, fishing reports for Walleye, Steelhead & Perch. Fish cleaning & smoking, boat storage.',
        species: 'Steelhead, Walleye, Yellow Perch',
        icon: '🎣',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.2395, 42.0429] },
      properties: {
        name: 'FishUSA Pro Shop',
        type: 'Tackle / Pro Shop',
        address: '6960 W Ridge Rd, Fairview, PA 16415',
        phone: '(800) 922-1219',
        website: 'https://www.fishusa.com/visit-the-pro-shop',
        description: 'Major online retailer with a public Pro Shop showroom in Fairview — right in Steelhead Alley. Full selection of rods, reels, line, lures and fly gear.',
        species: 'All species',
        icon: '🏪',
      },
    },
  ],
};
