import mongoose from "mongoose";
import { connectDB } from "../../config/db"

jest.mock("mongoose", () => ({
    connect: jest.fn(),
}));

describe("connectDB", () => {
    const mockConnect = mongoose.connect as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should connect to MongoDB successfully", async () => {
        mockConnect.mockResolvedValueOnce({});

        await connectDB();

        expect(mockConnect).toHaveBeenCalledWith(expect.any(String));
    });

    it("should log error and exit process on failure", async () => {
        const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
            throw new Error("process.exit called");
        });
        const error = new Error("Connection failed");
        mockConnect.mockRejectedValueOnce(error);

        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

        try {
            await connectDB();
        } catch (_) { }

        expect(consoleErrorSpy).toHaveBeenCalledWith("MongoDB connection error:", error);
        expect(mockExit).toHaveBeenCalledWith(1);

        consoleErrorSpy.mockRestore();
        mockExit.mockRestore();
    });
});