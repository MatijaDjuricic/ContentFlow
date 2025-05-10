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
    content: string,
    description: string,
    userId: string
}
export interface IUpdateBlogRequest {
    title?: string;
    content?: string;
    description?: string;
}

export interface IBlogResponse {
    title: string;
    content: string;
    description: string;
    userId: string;
}