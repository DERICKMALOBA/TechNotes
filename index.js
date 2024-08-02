import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rootRouter from './routes/root.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import corsOptions from './config/corsOptions.js';
import connectDB from './dbConnection.js';
import userRouter from './routes/userRoute.js';






// Load environment variables from .env file
dotenv.config();
const app = express();
connectDB();
app.use(cors(corsOptions));
app.use(express.json());// receiving and posting json files
app.use(cookieParser());
// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Use the root router
app.use('/', rootRouter);

app.use('/api/user', userRouter)


// 404 handler
app.all('*', (req, res) => {
    res.status(404).json({
        message: 'the resource you are looking for is not found',
    })
    
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
