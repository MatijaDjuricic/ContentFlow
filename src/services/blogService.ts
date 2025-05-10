import { injectable } from 'inversify';
import { Blog } from '../models/Blog';
import { IBlogService } from '../interfaces/IBlogService';
import {
    IBlog,
    IBlogResponse,
    ICreateBlogRequest,
    IUpdateBlogRequest
} from '../types/BlogTypes';
@injectable()
export class BlogService implements IBlogService {
    public getBlogsAsync = async (): Promise<IBlog[] | IBlogResponse[]> => {
        try {
            const blogs = await Blog.find();
            return blogs;
        } catch (error) {
            throw new Error('Error fetching blogs');
        }
    }
    public getBlogByIdAsync = async (id: string): Promise<IBlog | IBlogResponse | null> => {
        try {
            const blog = await Blog.findById(id);
            if (!blog) {
                throw new Error('Blog not found');
            }
            return blog;
        } catch (error) {
            throw new Error('Error fetching blog');
        }
    }
    public createBlogAsync = async (blogData: ICreateBlogRequest): Promise<IBlog | IBlogResponse> => {
        try {
            const newBlog = new Blog(blogData);
            await newBlog.save();
            return newBlog;
        } catch (error) {
            throw new Error('Error creating blog');
        }
    }
    public updateBlogAsync = async (id: string, blogData: IUpdateBlogRequest): Promise<IBlog | IBlogResponse> => {
        try {
            const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
            if (!updatedBlog) {
                throw new Error('Blog not found');
            }
            return updatedBlog;
        } catch (error) {
            throw new Error('Error updating blog');
        }
    }
    public deleteBlogAsync = async (id: string): Promise<IBlog | IBlogResponse | null> => {
        try {
            const deletedBlog = await Blog.findByIdAndDelete(id);
            if (!deletedBlog) {
                throw new Error('Blog not found');
            }
            return deletedBlog;
        } catch (error) {
            throw new Error('Error deleting blog');
        }
    }
}