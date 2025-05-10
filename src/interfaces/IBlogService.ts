import {
    IBlog,
    IBlogResponse,
    ICreateBlogRequest,
    IUpdateBlogRequest
} from "../types/BlogTypes";
export interface IBlogService {
    getBlogsAsync(): Promise<IBlog[] | IBlogResponse[]>;
    getBlogByIdAsync(id: string): Promise<IBlog | IBlogResponse | null>;
    createBlogAsync(blogData: ICreateBlogRequest): Promise<IBlog | IBlogResponse>;
    updateBlogAsync(id: string, blogData: IUpdateBlogRequest): Promise<IBlog | IBlogResponse>;
    deleteBlogAsync(id: string): Promise<IBlog | IBlogResponse | null>;
}