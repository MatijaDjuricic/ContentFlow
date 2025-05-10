import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserService } from '../interfaces/IUserService';
import { TYPES } from '../types/types';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
@injectable()
export class UserController {
    private readonly userService: IUserService;
    constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this.userService = userService;
    }
    public getUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.userService.getUsersAsync();
        res.status(200).json(users);
    });
    public getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        const user = await this.userService.getUserByIdAsync(id);
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        res.status(200).json(user);
    });
    public createUser = catchAsync(async (req: Request, res: Response) => {
        const { username, email, password } = req.body;
        const newUser = await this.userService.createUserAsync({ username, email, password });
        res.status(201).json(newUser);       
    });
    public updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        const { username, email, password } = req.body;
        const user = await this.userService.updateUserAsync(id, { username, email, password });
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        res.status(200).json(user);
    });
    public deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        const user = await this.userService.deleteUserAsync(id);
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
}