const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/listing`, async (req, res) => {
  const result = await prisma.rentalListing.create({ data: req.body })
    .catch(e => {
      console.error(e);
      return false;
    });

  if (!result) {
    return res.status(400).json(`Unable to create listing.`);
  }

  return res.status(201).json(result);
});

const server = app.listen(3000, () =>
  console.log(`Server started at: http://localhost:3000`),
)
