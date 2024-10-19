import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import binRoutes from './routes/binRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import { authRoutes } from './routes/authRoutes.js';
import WasteReqRoute from './routes/wasteRequestRoutes.js';

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
connectDB();
console.log('Mongo URI:', mongoURI); // Optional: for debugging
console.log('JWT Secret:', jwtSecret);
// Use routes
app.use('/api', authRoutes);
app.use('/api', binRoutes); // Bin routes
app.use('/api', userRoutes); // User routes
app.use('/api', WasteReqRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Waste Management System API');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
