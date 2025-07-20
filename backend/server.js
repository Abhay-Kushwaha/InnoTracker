import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import publicationRoutes from './routes/publications.js'
import grantRoutes from './routes/grants.js'
import patentRoutes from './routes/patents.js'
import awardRoutes from './routes/awards.js'
import startupRoutes from './routes/startups.js'
import innovationProjectRoutes from './routes/innovationProjects.js'
import usersRoutes from './routes/users.js'

// Load environment variables
dotenv.config()

// Check required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET']
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '))
    console.error('Please create a .env file with the required variables')
    process.exit(1)
}

const PORT = process.env.PORT || 3000
const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))

// MongoDB Connection with options
console.log('Connecting to MongoDB...')
mongoose.connect(process.env.MONGODB_URI, {
    dbName: "InnoTracker",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
})
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if cannot connect to database
    });

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/publications', publicationRoutes)
app.use('/api/grants', grantRoutes)
app.use('/api/patents', patentRoutes)
app.use('/api/awards', awardRoutes)
app.use('/api/startups', startupRoutes)
app.use('/api/innovation-projects', innovationProjectRoutes)
app.use('/api/users', usersRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})