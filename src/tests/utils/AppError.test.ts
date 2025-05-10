import { AppError } from '../../utils/AppError';

describe('AppError', () => {
  it('should create an error with status "fail" for 4xx codes', () => {
    const error = new AppError("Not Found", 404);

    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Not Found");
    expect(error.statusCode).toBe(404);
    expect(error.status).toBe("fail");
    expect(error.isOperational).toBe(true);
    expect(error.stack).toBeDefined();
  });

  it('should create an error with status "error" for 5xx codes', () => {
    const error = new AppError("Internal Server Error", 500);

    expect(error.status).toBe("error");
    expect(error.statusCode).toBe(500);
  });

  it('should capture stack trace', () => {
    const error = new AppError("Test error", 400);
    expect(typeof error.stack).toBe("string");
    expect(error.stack).toContain("AppError");
  });
});
