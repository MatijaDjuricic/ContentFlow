import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, IUserResponse } from '../types/UserTypes';
export const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
export const verifyPassword = (plainPassword: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};
export const generateToken = async (user: IUser | IUserResponse): Promise<string> => {
    const jwtSecret = process.env.JWT_SECRET || 'contentflowsecret';
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    return token;
}