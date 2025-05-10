import {
    IUser,
    IUserResponse,
    ICreateUserRequest,
    IUpdateUserRequest
} from "../types/UserTypes";
export interface IUserService {
    getUsersAsync(): Promise<IUser[] | IUserResponse[]>;
    getUserByIdAsync(id: string): Promise<IUser | IUserResponse | null>;
    createUserAsync(userData: ICreateUserRequest): Promise<IUser | IUserResponse>;
    updateUserAsync(id: string, userData: IUpdateUserRequest): Promise<IUser | IUserResponse | null>;
    deleteUserAsync(id: string): Promise<IUser | IUserResponse | null>;
}