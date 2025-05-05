import { injectable } from 'inversify';
import { User } from '../models/User';
import { IUserService } from '../interfaces/IUserService';
import { hashPassword } from '../utils/helpers';
@injectable()
export class UserService implements IUserService {
    public getUsersAsync = async () => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }
    public getUserByIdAsync = async (id: string) => {
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
    public createUserAsync = async (userData: { username: string; email: string; password: string }) => {
        try {
            userData.password = hashPassword(userData.password);
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error('Error creating user');
        }
    }
    public updateUserAsync = async (id: string, userData: { username: string; email: string; password: string }) => {
        try {
            userData.password = hashPassword(userData.password);
            const user = await User.findByIdAndUpdate(id, userData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error updating user');
        }
    }
    public deleteUserAsync = async (id: string) => {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                throw new Error('User not found');
            }
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
}