import { hashPassword } from '../../utils/helpers';
import bcrypt from 'bcryptjs';

describe('hashPassword', () => {
    const password = 'securePassword123';

    it('should return a hashed password', () => {
        const hashed = hashPassword(password);
        expect(typeof hashed).toBe('string');
        expect(hashed).not.toBe(password);
    });

    it('should match the original password when verified with bcrypt.compareSync', () => {
        const hashed = hashPassword(password);
        const isMatch = bcrypt.compareSync(password, hashed);
        expect(isMatch).toBe(true);
    });
});