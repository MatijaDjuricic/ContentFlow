import { injectable } from 'inversify';
import { User } from '../models/User';
import { IUserService } from '../interfaces/IUserService';
import { hashPassword, verifyPassword } from '../utils/helpers';
import {
    IUserResponse,
    ILoginUserRequest,
    ICreateUserRequest,
    IUpdateUserRequest,
} from '../types/UserTypes';
@injectable()
export class UserService implements IUserService {
    public createUserAsync = async (userData: ICreateUserRequest): Promise<IUserResponse> => {
        if (!userData.username || !userData.email || !userData.password) {
            throw new Error('All fields are required');
        }
        try {
            userData.password = hashPassword(userData.password);
            const newUser = new User(userData);
            const userResponse: IUserResponse = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            };
            await newUser.save();
            return userResponse;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }
    public loginUserAsync = async (userData: ILoginUserRequest): Promise<IUserResponse | null> => {
        try {
            const user = await User.findOne({ email: userData.email }).select('+password');
            if (!user || !verifyPassword(userData.password, user.password)) {
                return null;
            }
            const userResponse: IUserResponse = {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            return userResponse;
        } catch (error) {
            throw new Error('Error logging in user');
        }
    }
    public getUsersAsync = async (): Promise<IUserResponse[]> => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }
    public getUserByIdAsync = async (id: string): Promise<IUserResponse | null> => {
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
    public updateUserAsync = async (id: string, userData: IUpdateUserRequest): Promise<IUserResponse> => {
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
    public deleteUserAsync = async (id: string): Promise<IUserResponse | null> => {
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