const express = require('express')
const compression = require('compression')
const mongoSanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const xss = require('xss-clean')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const path = require('path')

// Config .env to ./config/config.env
require('dotenv').config({
  path: './config/config.env',
})

const app = express()

// Compress all responses
app.use(compression())

// Use bodyParser
app.use(bodyParser.json())

// // Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 min
  max: 100,
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Connect DataBase
connectDB()

// Init Middleware
app.use(express.json())

// Load all Routes
const postRoute = require('./routes/post.router')

// Use Routes
app.use('/api', postRoute)

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })
}

// Start Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
})
