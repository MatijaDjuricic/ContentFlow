import dotenv from 'dotenv';

dotenv.config();

interface Config {
    nodeEnv: string;
    port: number;
    mongoURI: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/contentflow',
};

export default config;