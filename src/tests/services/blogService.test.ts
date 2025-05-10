import { BlogService } from '../../services/BlogService';
import { Blog } from '../../models/Blog';

jest.mock('../../models/Blog', () => {
    const saveMock = jest.fn();
    const blogInstanceMock = { save: saveMock };
    const BlogMock = jest.fn(() => blogInstanceMock);

    Object.assign(BlogMock, {
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    });

    return {
        __esModule: true,
        Blog: BlogMock,
    };
});

describe('BlogService with Mongoose', () => {
    const blogService = new BlogService();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return blogs', async () => {
        const fakeBlogs = [{ title: 'A blog' }];
        (Blog.find as jest.Mock).mockResolvedValue(fakeBlogs);

        const result = await blogService.getBlogsAsync();
        expect(result).toEqual(fakeBlogs);
        expect(Blog.find).toHaveBeenCalled();
    });

    it('should create a blog', async () => {
        const blogData = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };

        const saveMock = jest.fn().mockResolvedValue(undefined);
        const blogInstanceMock = { ...blogData, save: saveMock };

        (Blog as unknown as jest.Mock).mockImplementation(() => blogInstanceMock);

        const result = await blogService.createBlogAsync(blogData);

        expect(Blog).toHaveBeenCalledWith(blogData);
        expect(saveMock).toHaveBeenCalled();
        expect(result).toMatchObject(blogData);
    });

    it('should get blog by ID', async () => {
        const blog = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };
        (Blog.findById as jest.Mock).mockResolvedValue(blog);

        const result = await blogService.getBlogByIdAsync('1');
        expect(result).toEqual(blog);
        expect(Blog.findById).toHaveBeenCalledWith('1');
    });

    it('should update blog by ID', async () => {
        const blog = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };
        (Blog.findByIdAndUpdate as jest.Mock).mockResolvedValue(blog);

        const result = await blogService.updateBlogAsync('1', blog);
        expect(result).toEqual(blog);
        expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith('1', blog, { new: true });
    });

    it('should delete blog', async () => {
        const blog = { title: 'Blog', content: 'Content', description: 'Description', userId: '1' };
        (Blog.findByIdAndDelete as jest.Mock).mockResolvedValue(blog);

        const result = await blogService.deleteBlogAsync('1');
        expect(result).toEqual(blog);
        expect(Blog.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
});