export interface IBlogService {
    getBlogsAsync(): Promise<any[]>;
    getBlogByIdAsync(id: string): Promise<any>;
    createBlogAsync(blogData: { title: string; content: string, description: string, userId: number }): Promise<any>;
    updateBlogAsync(id: string, blogData: { title: string; content: string }): Promise<any>;
    deleteBlogAsync(id: string): Promise<any>;
}