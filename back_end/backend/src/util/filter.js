const {number} = require("joi");

function filterListings(listings, filter) {
  const { priceRange, bedrooms, bathrooms, structuralType, leaser } = filter;

  return listings.filter(listing => {
    // Default values
    const defaultMinPrice = 0;
    const defaultMaxPrice = Number.MAX_SAFE_INTEGER;

    // Filter by bedrooms
    if (bedrooms && listing.roomCount.bedrooms !== parseInt(bedrooms)) {
      return false;
    }

    // Filter by bathrooms
    if (bathrooms && listing.roomCount.bathrooms !== parseInt(bathrooms)) {
      return false;
    }

    // Filter by price range
    const [min, max] = priceRange ? priceRange.split('-').map(Number) : [defaultMinPrice, defaultMaxPrice];
    if ((listing.price < min && !isNaN(min)) || (listing.price > max && !isNaN(max))) {
      return false;
    }

    // Filter by structural type
    if (structuralType && listing.structuralType !== structuralType) {
      return false;
    }

    // Filter by leaser
    if (leaser && listing.leaser !== leaser) {
      return false;
    }

    return true;
  });
}

module.exports = {
  filterListings,
};
