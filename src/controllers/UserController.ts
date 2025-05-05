import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserService } from '../interfaces/IUserService';
import { TYPES } from '../types/types';
@injectable()
export class UserController {
    private readonly userService: IUserService;
    constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this.userService = userService;
    }
    public getUsers = async (_: Request, res: Response) => {
        try {
            const users = await this.userService.getUsersAsync();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    }
    public getUserById = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const user = await this.userService.getUserByIdAsync(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user' });
        }
    }
    public createUser = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const newUser = await this.userService.createUserAsync({ username, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
    public updateUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const { username, email, password } = req.body;
            const user = await this.userService.updateUserAsync(id, { username, email, password });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user' });
        }
    }
    public deleteUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const user = await this.userService.deleteUserAsync(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
}