import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/database.js';

dotenv.config({
    path: '.env'
})

const app = express();
connectDB();

app.use(cors({
    methods:['GET','POST','PUT','DELETE'],
    origin: [process.env.FRONTEND_URL],
    credentials: true,
}));


app.use(express.json())

// Routes
import vehicleRoutes from './routes/vehicle.js';
import bookingRoutes from './routes/booking.js';



app.use('/api/v1', vehicleRoutes);
app.use('/api/v1', bookingRoutes);

app.get('/',(req,res)=>{
    res.send("<h1>WORKING</h1>")
})


app.listen(process.env.PORT , () => {
    console.log(`server is running on PORT:${process.env.PORT}`)
})

export default app;
