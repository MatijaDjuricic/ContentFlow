export interface IUserService {
    getUsersAsync(): Promise<any[]>;
    getUserByIdAsync(id: string): Promise<any>;
    createUserAsync(userData: { username: string; email: string; password: string }): Promise<any>;
    updateUserAsync(id: string, userData: { username: string; email: string; password: string }): Promise<any>;
    deleteUserAsync(id: string): Promise<{ message: string }>;
}