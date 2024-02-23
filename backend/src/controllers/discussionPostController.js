const Joi = require('joi');
const { DiscussionPostService } = require('../services/discussionPostService');

async function upsertDiscussionPost(req, res) {
  if (!req.session.user) {
    return res.status(401).json("Unauthorized");
  }

  const validation = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().required(),
    parentId: Joi.string().optional(),
  }).validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json(validation.error.details.map(detail => detail.message).join(", "));
  }

  const service = new DiscussionPostService(req.app.locals.prisma);
  const result = await service.upsertPost({
    ...validation.value,
    authorType: "OWNER", // TODO: Change after user role feat is implemented
    authorId: req.session.user.id,
  });

  if (!result) {
    return res.status(400).json(`Unable to upsert discussion post.`);
  }

  return res.status(201).json(result);
}

module.exports = {
  upsertDiscussionPost,
}