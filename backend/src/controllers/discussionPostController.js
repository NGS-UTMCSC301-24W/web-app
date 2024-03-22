const Joi = require('joi');
const { DiscussionPostService } = require('../services/discussionPostService');

async function upsertDiscussionPost(req, res) {
  const validation = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().max(200).allow("").required(),
    content: Joi.string().required(),
    parentId: Joi.string().optional(),
    authorType: Joi.string().allow("OWNER", "RENTER").required(),
    authorId: Joi.string().required(),
  }).validate({
    ...req.body,
    authorType: req.session.user.role === "user" ? "RENTER" : "OWNER",
    authorId: req.session.user.id,
  }, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json(validation.error.details.map(detail => detail.message).join(", "));
  }

  const service = new DiscussionPostService(req.app.locals.prisma);
  const result = await service.upsertPost(validation.value);

  if (!result) {
    return res.status(400).json(`Unable to upsert discussion post.`);
  }

  return res.status(201).json(result);
}

async function getDiscussionPost(req, res) {
  const validation = Joi.object({
    id: Joi.string().required(),
    authorType: Joi.string().allow("OWNER", "RENTER").required(),
  }).validate({
    id: req.query.id,
    authorType: req.session.user.role === "user" ? "RENTER" : "OWNER",
  }, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json(validation.error.details.map(detail => detail.message).join(", "));
  }

  const service = new DiscussionPostService(req.app.locals.prisma);
  const result = await service.getPost(validation.value).then(post => ({
    ...post,
    editable: post.authorId === req.session.user.id,
  }));

  if (!result) {
    return res.status(400).json(`Unable to get discussion post.`);
  }

  return res.status(200).json(result);
}

async function getDiscussionPosts(req, res) {
  const service = new DiscussionPostService(req.app.locals.prisma);
  const result = await service.getPosts({
    parentId: req.query.parentId,
    page: req.query.page,
    type: req.session.user.role === "user" ? "RENTER" : "OWNER",
  }).then(posts => posts.map(post => ({
    ...post,
    editable: post.authorId === req.session.user.id,
  })));

  return res.status(200).json(result);
}

async function deleteDiscussionPost(req, res) {
  const validation = Joi.object({
    id: Joi.string().required(),
    authorId: Joi.string().required(),
  }).validate({
    ...req.body,
    authorId: req.session.user.id,
  }, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json(validation.error.details.map(detail => detail.message).join(", "));
  }

  const service = new DiscussionPostService(req.app.locals.prisma);
  const result = await service.deletePost(validation.value);

  if (!result) {
    return res.status(400).json(`Unable to delete discussion post.`);
  }

  return res.status(200).json(result);
}

module.exports = {
  upsertDiscussionPost,
  getDiscussionPost,
  getDiscussionPosts,
  deleteDiscussionPost,
}