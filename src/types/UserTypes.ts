export interface IUser extends Document {
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