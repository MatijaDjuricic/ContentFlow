import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../models/User';

let mongo: MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});

afterEach(async () => {
    if (mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
});

describe('User Model', () => {
    it('should create a user with valid data', async () => {
        const user = await User.create({
            username: 'username',
            email: 'email@example.com',
            password: 'password',
        });

        expect(user._id).toBeDefined();
        expect(user.username).toBe('username');
        expect(user.email).toBe('email@example.com');
        expect(user.password).toBe('password');
    });

    it('should not allow invalid email', async () => {
        try {
            await User.create({
                username: 'invalid_user',
                email: 'invalid_email',
                password: 'password',
            });
        } catch (err: any) {
            expect(err).toBeDefined();
            expect(err.errors.email.message).toBe('invalid_email is not a valid email!');
        }
    });

    it('should not allow duplicate email', async () => {
        await User.create({
            username: 'user1',
            email: 'duplicate@example.com',
            password: 'password1',
        });

        try {
            await User.create({
                username: 'user2',
                email: 'duplicate@example.com',
                password: 'password2',
            });
        } catch (err: any) {
            expect(err).toBeDefined();
            expect(err.code).toBe(11000);
        }
    });
});