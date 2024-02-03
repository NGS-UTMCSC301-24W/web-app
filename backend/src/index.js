const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const Joi = require('joi');

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors());

app.post(`/listing`, async (req, res) => {
  const validation = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    price: Joi.number().min(0).required(),
    images: Joi.array().items(Joi.string()).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json(validation.error.details.map(detail => detail.message).join(", "));
  }

  const result = await prisma.rentalListing.create({ data: validation.value })
    .catch(e => {
      console.error(e);
      return false;
    });

  if (!result) {
    return res.status(400).json(`Unable to create listing.`);
  }

  return res.status(201).json(result);
});

app.get(`/listing-create-upload-url`, async (req, res) => {
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
});

const server = app.listen(3001, () =>
  console.log(`Server started at: http://localhost:3001`),
)
