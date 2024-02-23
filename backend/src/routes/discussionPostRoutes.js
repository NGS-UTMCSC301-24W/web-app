const express = require('express');
const { upsertDiscussionPost } = require('../controllers/discussionPostController');

const router = express.Router();

// Define routes
router.post('/upsert', upsertDiscussionPost);

module.exports = router;