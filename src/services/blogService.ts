import { injectable } from 'inversify';
import { Blog } from '../models/Blog';
import { IBlogService } from '../interfaces/IBlogService';
@injectable()
export class BlogService implements IBlogService {
    public getBlogsAsync = async () => {
        try {
            const blogs = await Blog.find();
            return blogs;
        } catch (error) {
            throw new Error('Error fetching blogs');
        }
    }
    public getBlogByIdAsync = async (id: string) => {
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
    public createBlogAsync = async (blogData: { title: string; content: string }) => {
        try {
            const newBlog = new Blog(blogData);
            await newBlog.save();
            return newBlog;
        } catch (error) {
            throw new Error('Error creating blog');
        }
    }
    public updateBlogAsync = async (id: string, blogData: { title: string; content: string, userId: string }) => {
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
    public deleteBlogAsync = async (id: string) => {
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