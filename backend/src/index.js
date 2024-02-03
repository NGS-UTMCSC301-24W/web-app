const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

const app = express()
app.locals.prisma = new PrismaClient();

app.use(express.json())
app.use(cors());

app.use('/listings', listingRoutes);
app.use('/users', userRoutes);

const server = app.listen(3001, () =>
  console.log(`Server started at: http://localhost:3001`),
)
