const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/rentalListings', searchController.searchRentalListings);

module.exports = router;
