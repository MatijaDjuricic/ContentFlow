import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
import { connectDB } from "./config/db";

const app = express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);

export default app;