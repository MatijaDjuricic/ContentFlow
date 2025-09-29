export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface IUpdateUserRequest {
    username?: string;
    email?: string;
    password?: string;
}

export interface IUserResponse {
    id: string;
    username: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ILoginUserRequest = Omit<ICreateUserRequest, 'username'>;