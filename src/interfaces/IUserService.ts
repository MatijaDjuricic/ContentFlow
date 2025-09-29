import {
    IUser,
    IUserResponse,
    ICreateUserRequest,
    ILoginUserRequest,
    IUpdateUserRequest,
} from "../types/UserTypes";
export interface IUserService {
    loginUserAsync(userData: ILoginUserRequest): Promise<IUser | IUserResponse | null>;
    getUsersAsync(): Promise<IUser[] | IUserResponse[]>;
    getUserByIdAsync(id: string): Promise<IUser | IUserResponse | null>;
    createUserAsync(userData: ICreateUserRequest): Promise<IUser | IUserResponse>;
    updateUserAsync(id: string, userData: IUpdateUserRequest): Promise<IUser | IUserResponse | null>;
    deleteUserAsync(id: string): Promise<IUser | IUserResponse | null>;
}