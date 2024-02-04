const express = require('express');
const { createListing, getUploadImageUrl,
    getAllListings, getFilteredListings } = require('../controllers/listingController');

const router = express.Router();

// Define routes
router.post('/create', createListing);
router.get('/upload-image-url', getUploadImageUrl);
router.get('/all', getAllListings);
router.get('/filter', getFilteredListings);

module.exports = router;