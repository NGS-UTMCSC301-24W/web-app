const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

const server = app.listen(3000, () =>
  console.log(`Server started at: http://localhost:3000`),
)
