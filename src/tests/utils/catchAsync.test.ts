import { catchAsync } from '../../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';

describe('catchAsync', () => {
    it('should call the wrapped function with req, res, next', async () => {
        const req = {} as Request;
        const res = {} as Response;
        const next: NextFunction = jest.fn();
        const handler = jest.fn().mockResolvedValue(undefined);

        const wrapped = catchAsync(handler);

        await wrapped(req, res, next);

        expect(handler).toHaveBeenCalledWith(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    it('should catch errors and pass them to next()', async () => {
        const req = {} as Request;
        const res = {} as Response;
        const next: NextFunction = jest.fn();
        const error = new Error("Async error");
        const handler = jest.fn().mockRejectedValue(error);

        const wrapped = catchAsync(handler);

        await wrapped(req, res, next);

        expect(handler).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(error);
    });
});