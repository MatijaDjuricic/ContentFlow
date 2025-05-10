import { container } from '../container';
import { TYPES } from '../types/types';
import { UserController } from '../controllers/UserController';
import { BlogController } from '../controllers/BlogController';
import { IUserService } from '../interfaces/IUserService';
import { IBlogService } from '../interfaces/IBlogService';
import { UserService } from '../services/UserService';
import { BlogService } from '../services/BlogService';

describe('Inversify Container', () => {
    it('should resolve UserController with injected UserService', () => {
        const userController = container.get(UserController);
        expect(userController).toBeInstanceOf(UserController);
        expect(userController['userService']).toBeInstanceOf(UserService);
    });

    it('should resolve BlogController with injected BlogService', () => {
        const blogController = container.get(BlogController);
        expect(blogController).toBeInstanceOf(BlogController);
    });

    it('should resolve UserService from IUserService binding', () => {
        const userService = container.get<IUserService>(TYPES.IUserService);
        expect(userService).toBeInstanceOf(UserService);
    });

    it('should resolve BlogService from IBlogService binding', () => {
        const blogService = container.get<IBlogService>(TYPES.IBlogService);
        expect(blogService).toBeInstanceOf(BlogService);
    });

    it('should return singleton instances for services', () => {
        const userService1 = container.get<IUserService>(TYPES.IUserService);
        const userService2 = container.get<IUserService>(TYPES.IUserService);
        expect(userService1).toBe(userService2); // same instance

        const blogService1 = container.get<IBlogService>(TYPES.IBlogService);
        const blogService2 = container.get<IBlogService>(TYPES.IBlogService);
        expect(blogService1).toBe(blogService2);
    });
});