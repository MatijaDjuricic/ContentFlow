import request from 'supertest';
import express from 'express';
import { BlogController } from '../../controllers/BlogController';
import { IBlogService } from '../../interfaces/IBlogService';
import { globalErrorMiddleware } from '../../middlewares/globalErrorMiddleware';

const mockBlogService: jest.Mocked<IBlogService> = {
    getBlogsAsync: jest.fn(),
    createBlogAsync: jest.fn(),
    getBlogByIdAsync: jest.fn(),
    updateBlogAsync: jest.fn(),
    deleteBlogAsync: jest.fn(),
};

describe('BlogController', () => {
    let app: express.Application;

    beforeEach(() => {
        const controller = new BlogController(mockBlogService);
        app = express();
        app.use(express.json());

        app.get('/blogs', controller.getAllBlogs);
        app.post('/blogs', controller.createBlog);
        app.get('/blogs/:id', controller.getBlogById as express.RequestHandler);
        app.put('/blogs/:id', controller.updateBlog as express.RequestHandler);
        app.delete('/blogs/:id', controller.deleteBlog as express.RequestHandler);
        
        app.use(globalErrorMiddleware);
    });

    it('should return all blogs on success', async () => {
        const blogs = [{ title: 'Blog', content: 'Content', description: 'Description', userId: '1' }];
        mockBlogService.getBlogsAsync.mockResolvedValue(blogs);

        const res = await request(app).get('/blogs');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(blogs);
    });

    it('should return an error message on failure', async () => {
        mockBlogService.getBlogsAsync.mockRejectedValue(new Error('Error fetching blogs'));

        const res = await request(app).get('/blogs');

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Error fetching blogs');
    });

    it('should create a new blog on success', async () => {
        const blog = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };
        mockBlogService.createBlogAsync.mockResolvedValue(blog);

        const res = await request(app).post('/blogs').send(blog);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(blog);
    });

    it('should return an error message on failure to create blog', async () => {
        mockBlogService.createBlogAsync.mockRejectedValue(new Error('Error creating blog'));

        const res = await request(app).post('/blogs').send({ title: 'New Blog' });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Error creating blog');
    });

    it('should return a blog by id on success', async () => {
        const blog = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };
        mockBlogService.getBlogByIdAsync.mockResolvedValue(blog);

        const res = await request(app).get('/blogs/1');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(blog);
    });

    it('should return 404 when blog is not found', async () => {
        mockBlogService.getBlogByIdAsync.mockResolvedValue(null);

        const res = await request(app).get('/blogs/1');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Blog not found');
    });

    it('should update a blog on success', async () => {
        const blog = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };
        mockBlogService.getBlogByIdAsync.mockResolvedValue(blog);
        mockBlogService.updateBlogAsync.mockResolvedValue(blog);

        const res = await request(app).put('/blogs/1').send(blog);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(blog);
    });

    it('should return 404 if blog is not found for update', async () => {
        mockBlogService.getBlogByIdAsync.mockResolvedValue(null);

        const res = await request(app).put('/blogs/1').send({ title: 'Updated Blog' });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Blog not found');
    });

    it('should delete a blog on success', async () => {
        const blog = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };
        mockBlogService.deleteBlogAsync.mockResolvedValue(blog);

        const res = await request(app).delete('/blogs/1');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Blog deleted successfully');
    });

    it('should return an error message on failure to delete blog', async () => {
        mockBlogService.deleteBlogAsync.mockRejectedValue(new Error('Error deleting blog'));

        const res = await request(app).delete('/blogs/1');

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Error deleting blog');
    });
    
    it('should return 404 if blog not found for delete', async () => {
        mockBlogService.deleteBlogAsync.mockResolvedValue(null);

        const res = await request(app).delete('/blogs/1');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Blog not found');
    });
});