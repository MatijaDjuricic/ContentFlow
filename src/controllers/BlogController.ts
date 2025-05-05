import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IBlogService } from '../interfaces/IBlogService';
import { TYPES } from '../types/types';
@injectable()
export class BlogController {
    private readonly blogService: IBlogService;
    constructor(@inject(TYPES.IBlogService) blogService: IBlogService) {
        this.blogService = blogService;
    }
    public getAllBlogs = async (_: Request, res: Response) => {
        try {
            const blogs = await this.blogService.getBlogsAsync();
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching blogs' });
        }
    }
    public createBlog = async (req: Request, res: Response) => {
        try {
            const { title, content, description, userId } = req.body;
            const newBlog = await this.blogService.createBlogAsync({ title, content, description, userId });
            res.status(201).json(newBlog);
        } catch (error) {
            res.status(500).json({ message: 'Error creating blog' });
        }
    }
    public getBlogById = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const blog = await this.blogService.getBlogByIdAsync(id);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching blog' });
        }
    }
    public updateBlog = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const { title, content } = req.body;
            const blog = await this.blogService.getBlogByIdAsync(id);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            const updatedBlog = await this.blogService.updateBlogAsync(id, { title, content });
            res.status(200).json(updatedBlog);  
        } catch (error) {
            res.status(500).json({ message: 'Error updating blog' });
        }
    }
    public deleteBlog = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const deletedBlog = await this.blogService.deleteBlogAsync(id);
            if (!deletedBlog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting blog' });
        }
    }
}