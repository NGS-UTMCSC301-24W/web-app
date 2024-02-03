const express = require('express');
const { createListing, getUploadImageUrl } = require('../controllers/listingController');

const router = express.Router();

// Define routes
router.post('/create', createListing);
router.get('/upload-image-url', getUploadImageUrl);

module.exports = router;