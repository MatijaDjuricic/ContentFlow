import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Blog } from '../../models/Blog';

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

describe('Blog Model', () => {
    it('should create a blog post with valid data', async () => {
        const blog = await Blog.create({
            title: 'title',
            content: 'content',
            userId: '1',
        });

        expect(blog._id).toBeDefined();
        expect(blog.title).toBe('title');
        expect(blog.content).toBe('content');
        expect(blog.userId).toBe('1');
        expect(blog.createdAt).toBeInstanceOf(Date);
        expect(blog.updatedAt).toBeInstanceOf(Date);
    });

    it('should fail to create blog without required fields', async () => {
        try {
            await Blog.create({
                title: 'Missing Content',
                userId: '1',
            });
        } catch (err: any) {
            expect(err).toBeDefined();
            expect(err.errors.content.message).toBe('Path `content` is required.');
        }
    });
});