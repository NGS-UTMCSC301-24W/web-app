const express = require('express');
const {
  upsertDiscussionPost, getDiscussionPosts,
  deleteDiscussionPost, getDiscussionPost
} = require('../controllers/discussionPostController');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json("Unauthorized");
  }

  next();
});

// Define routes
router.post('/', upsertDiscussionPost);
router.get('/', getDiscussionPost);
router.get('/query', getDiscussionPosts);
router.delete('/', deleteDiscussionPost);

module.exports = router;