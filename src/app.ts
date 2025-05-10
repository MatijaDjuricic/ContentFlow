import express, { NextFunction, Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
import { connectDB } from "./config/db";
import { globalErrorMiddleware } from './middlewares/globalErrorMiddleware';
import { AppError } from './utils/AppError';

const app = express();

connectDB();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('prod'));
}

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);

app.use((req: Request, _, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorMiddleware);

export default app;