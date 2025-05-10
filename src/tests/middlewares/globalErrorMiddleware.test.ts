import { Request, Response, NextFunction } from 'express';
import { globalErrorMiddleware } from '../../middlewares/globalErrorMiddleware';
describe("globalErrorMiddleware", () => {
    it("should send a formatted error response", () => {
        const mockError = new Error("Something went wrong");
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as jest.Mocked<Response>;
        const next: NextFunction = jest.fn();

        globalErrorMiddleware(mockError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            message: "Something went wrong",
        });
    });

    it("should use statusCode and status from the error if available", () => {
        const mockError = {
            message: "Custom error",
            statusCode: 404,
            status: "fail"
        };
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as jest.Mocked<Response>;
        const next: NextFunction = jest.fn();

        globalErrorMiddleware(mockError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Custom error",
        });
    });
});