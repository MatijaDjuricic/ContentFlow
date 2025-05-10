import { UserService } from '../../services/UserService';
import { User } from '../../models/User';

jest.mock('../../models/User', () => {
    const saveMock = jest.fn();
    const userInstanceMock = { save: saveMock };
    const UserMock = jest.fn(() => userInstanceMock);

    Object.assign(UserMock, {
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    });

    return {
        __esModule: true,
        User: UserMock,
    };
});

describe('UserService with Mongoose', () => {
    const userService = new UserService();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return users', async () => {
        const users = [{ username: 'User', email: 'Email', password: 'Password' }];
        (User.find as jest.Mock).mockResolvedValue(users);

        const result = await userService.getUsersAsync();
        expect(result).toEqual(users);
        expect(User.find).toHaveBeenCalled();
    });

    it('should create a user', async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        const saveMock = jest.fn().mockResolvedValue(undefined);
        const userInstanceMock = { ...user, save: saveMock };
        
        (User as unknown as jest.Mock).mockImplementation(() => userInstanceMock);
        const result = await userService.createUserAsync(user);
        
        expect(User).toHaveBeenCalledWith(user);
        expect(saveMock).toHaveBeenCalled();
        expect(result).toMatchObject({
            username: user.username,
            email: user.email,
            password: expect.any(String),
        });
    });

    it('should get user by ID', async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        (User.findById as jest.Mock).mockResolvedValue(user);

        const result = await userService.getUserByIdAsync('1');
        expect(result).toEqual(user);
        expect(User.findById).toHaveBeenCalledWith('1');
    });

    it('should update user by ID', async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(user);

        const result = await userService.updateUserAsync('1', user);
        expect(result).toEqual(user);
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', user, { new: true });
    });

    it('should delete user by ID', async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        (User.findByIdAndDelete as jest.Mock).mockResolvedValue(user);

        const result = await userService.deleteUserAsync('1');
        expect(result).toEqual(user);
        expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
});