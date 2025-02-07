const searchService = require('../services/searchService');

const searchRentalListings = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await searchService.searchRentalListings(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  searchRentalListings,
};
