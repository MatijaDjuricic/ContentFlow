export interface IBlog extends Document {
    title: string;
    content: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateBlogRequest {
    title: string;
    content: string;
}

export interface IUpdateBlogRequest {
    title?: string;
    content?: string;
}

export type BlogResponse = IBlog;

export type BlogsResponse = IBlog[];