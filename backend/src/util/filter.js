function filterListings(listings, filter) {

  const {
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
    minLatitude = -90,
    maxLatitude = 90,
    minLongitude = -180,
    maxLongitude = 180,
    // Add more conditions as needed
  } = filter;

  return listings.filter(listing => {
    return (
      (listing.price >= minPrice) &&
      (listing.price <= maxPrice) &&
      (listing.latitude >= minLatitude) &&
      (listing.latitude <= maxLatitude) &&
      (listing.longitude >= minLongitude) &&
      (listing.longitude <= maxLongitude)
      // Add more conditions as needed
    );
  });
}

module.exports = {
  filterListings,
};
