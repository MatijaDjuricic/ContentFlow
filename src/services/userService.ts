import { injectable } from 'inversify';
import { User } from '../models/User';
import { IUserService } from '../interfaces/IUserService';
import { hashPassword } from '../utils/helpers';
import {
    IUser,
    IUserResponse,
    ICreateUserRequest,
    IUpdateUserRequest,
} from '../types/UserTypes';
@injectable()
export class UserService implements IUserService {
    public getUsersAsync = async (): Promise<IUser[] | IUserResponse[]> => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }
    public getUserByIdAsync = async (id: string): Promise<IUser | IUserResponse | null> => {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }
    public createUserAsync = async (userData: ICreateUserRequest): Promise<IUser | IUserResponse> => {
        if (!userData.username || !userData.email || !userData.password) {
            throw new Error('All fields are required');
        }
        try {
            userData.password = hashPassword(userData.password);
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }
    public updateUserAsync = async (id: string, userData: IUpdateUserRequest): Promise<IUser | IUserResponse> => {
        if (userData.password) {
            userData.password = hashPassword(userData.password);
        }
        try {
            const user = await User.findByIdAndUpdate(id, userData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error updating user');
        }
    }
    public deleteUserAsync = async (id: string): Promise<IUser | null> => {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
}