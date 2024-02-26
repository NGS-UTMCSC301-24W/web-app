const express = require('express')
const session = require('express-session')
const cors = require('cors')
const MongoDBStore = require('connect-mongo');
const { PrismaClient } = require('@prisma/client')

const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

const app = express()
app.locals.prisma = new PrismaClient();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const store = MongoDBStore.create({
  mongoUrl: 'mongodb+srv://uhome:jIUYvEAfe0Ei5LBK@uhomecluster.n5eb67d.mongodb.net/db?authSource=admin&retryWrites=true&w=majority',
  dbName: 'User',
});

store.on('error', function(error) {
  console.error('Session store error:', error);
});

app.use(
  session({
    secret: 'asduAWdh3$r3r23jrb!dcef-d',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use('/listings', listingRoutes);
app.use('/users', userRoutes);

const server = app.listen(3001, () =>
  console.log(`Server started at: http://localhost:3001`),
)
