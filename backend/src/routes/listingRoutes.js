const express = require('express');
const { createListing, getUploadImageUrl, getListing } = require('../controllers/listingController');

const router = express.Router();

// Define routes
router.post('/create', createListing);
router.get('/upload-image-url', getUploadImageUrl);
router.get('/:id', getListing);

module.exports = router;