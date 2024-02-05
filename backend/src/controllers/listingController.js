const { ListingService } = require('../services/listingService');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const Joi = require('joi');

async function createListing(req, res) {
  const validation = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    price: Joi.number().min(0).required(),
    images: Joi.array().items(Joi.string()).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    bedrooms: Joi.number().min(0).required(),
    bathrooms: Joi.number().min(0).required(),
    structuralType: Joi.string().valid("HOUSE", "BASEMENT", "APARTMENT", "CONDO", "ROOM").required(),
    leaser: Joi.string().valid("OWNER", "ROOMMATE").required()
  }).validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json(validation.error.details.map(detail => detail.message).join(", "));
  }

  const { latitude, longitude, bedrooms, bathrooms, ...rest } = validation.value;
  const newListing = {
    ...rest,
    location: { coordinates: [longitude, latitude] },
    roomCount: { bedrooms, bathrooms },
  };

  const listingService = new ListingService(req.app.locals.prisma);
  const result = await listingService.createListing(newListing);

  if (!result) {
    return res.status(400).json(`Unable to create listing.`);
  }

  return res.status(201).json(result);
}

async function getUploadImageUrl(req, res) {
  // Never store access key and secret key in code. I'll do it here for simplicity and we don't have a server to store it.
  const client = new S3Client({
    credentials: {
      accessKeyId: "AKIAZK2CV2WX2N5LE7QH",
      secretAccessKey: "mq3JJXCuuj9j5gbTqyi4RyGnVLua3tNiw0Vlz64c"
    },
    region: "us-east-1"
  });

  const key = crypto.randomUUID().replaceAll("-", "") + ".jpg";
  const command = new PutObjectCommand({
    Bucket: "csc301-uhome-images",
    Key: key,
  });

  return res.json(await getSignedUrl(client, command, { expiresIn: 60 * 60 }));
}

async function getListing(req, res) {
  const validation = Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }).validate(req.params, { abortEarly: false });
  
  if (validation.error) {
    return res.status(400).json(validation.error.details.map(detail => detail.message).join(", "));
  }

  const listingService = new ListingService(req.app.locals.prisma);
  const result = await listingService.getListing(req.params.id);

  if (!result) {
    return res.status(404).json(`Listing not found.`);
  }

  return res.status(200).json(result);
}

module.exports = {
  createListing,
  getUploadImageUrl,
  getListing,
};