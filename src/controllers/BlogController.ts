import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IBlogService } from '../interfaces/IBlogService';
import { TYPES } from '../types/types';
import { catchAsync } from '../utils/catchAsync';
@injectable()
export class BlogController {
    private readonly blogService: IBlogService;
    constructor(@inject(TYPES.IBlogService) blogService: IBlogService) {
        this.blogService = blogService;
    }
    public getAllBlogs = catchAsync(async (_: Request, res: Response) => {
        const blogs = await this.blogService.getBlogsAsync();
        res.status(200).json(blogs);
    });
    public createBlog = catchAsync(async (req: Request, res: Response) => {
        const { title, content, description, userId } = req.body;
        const newBlog = await this.blogService.createBlogAsync({ title, content, description, userId });
        res.status(201).json(newBlog);
    });
    public getBlogById = catchAsync(async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const blog = await this.blogService.getBlogByIdAsync(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    });
    public updateBlog = catchAsync(async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const { title, content } = req.body;
        const blog = await this.blogService.getBlogByIdAsync(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const updatedBlog = await this.blogService.updateBlogAsync(id, { title, content });
        res.status(200).json(updatedBlog);  
    });
    public deleteBlog = catchAsync(async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const deletedBlog = await this.blogService.deleteBlogAsync(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    });
}