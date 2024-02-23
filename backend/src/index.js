const express = require('express')
const session = require('express-session')
const cors = require('cors')
const MongoDBStore = require('connect-mongo');
const { PrismaClient } = require('@prisma/client')

const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express()
app.locals.prisma = new PrismaClient();

app.use(express.json())
app.use(cors());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoDBStore.create({
      mongoUrl: 'mongodb+srv://uhome:jIUYvEAfe0Ei5LBK@uhomecluster.n5eb67d.mongodb.net/db?authSource=admin&retryWrites=true&w=majority',
      dbName: 'User',
    }),
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use('/listings', listingRoutes);
app.use('/users', userRoutes);
app.use('/search', searchRoutes);

const server = app.listen(3001, () =>
  console.log(`Server started at: http://localhost:3001`),
)
