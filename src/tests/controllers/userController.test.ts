import request from "supertest";
import express from "express";
import { globalErrorMiddleware } from "../../middlewares/globalErrorMiddleware";
import { UserController } from "../../controllers/UserController";
import { IUserService } from "../../interfaces/IUserService";

const mockUserService: jest.Mocked<IUserService> = {
    getUsersAsync: jest.fn(),
    createUserAsync: jest.fn(),
    getUserByIdAsync: jest.fn(),
    updateUserAsync: jest.fn(),
    deleteUserAsync: jest.fn(),
};
describe("UserController", () => {
    let app: express.Application;

    beforeEach(() => {
        const controller = new UserController(mockUserService);
        app = express();
        app.use(express.json());

        app.get("/users", controller.getUsers);
        app.post("/users", controller.createUser);
        app.get("/users/:id", controller.getUserById as express.RequestHandler);
        app.put("/users/:id", controller.updateUser as express.RequestHandler);
        app.delete("/users/:id", controller.deleteUser as express.RequestHandler);

        app.use(globalErrorMiddleware);
    });

    it("should return all users on success", async () => {
        const users = [{ username: 'User', email: 'Email', password: 'Password' }];
        mockUserService.getUsersAsync.mockResolvedValue(users);

        const res = await request(app).get("/users");
        
        expect(res.status).toBe(200);
        expect(res.body).toEqual(users);
    });

    it("should return an error message on failure", async () => {
        mockUserService.getUsersAsync.mockRejectedValue(new Error("Error fetching users"));

        const res = await request(app).get("/users");

        expect(res.status).toBe(500);
        expect(res.body.status).toBe("error");
        expect(res.body.message).toBe("Error fetching users");
    });
    
    it("should create a new user on success", async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        mockUserService.createUserAsync.mockResolvedValue(user);

        const res = await request(app).post("/users").send(user);
            
        expect(res.status).toBe(201);
        expect(res.body).toEqual(user);
    });

    it("should return an error message on failure to create user", async () => {
        mockUserService.createUserAsync.mockRejectedValue(new Error("Error creating user"));
        
        const res = await request(app).post("/users").send({ username: "New User", email: "email", password: "password" });

        expect(res.status).toBe(500);
        expect(res.body.status).toBe("error");
        expect(res.body.message).toBe("Error creating user");
    });

    it("should return a user by ID on success", async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        mockUserService.getUserByIdAsync.mockResolvedValue(user);

        const res = await request(app).get("/users/1");
            
        expect(res.status).toBe(200);
        expect(res.body).toEqual(user);
    });

    it("should return an error message on failure to get user by ID", async () => {
        mockUserService.getUserByIdAsync.mockRejectedValue(new Error("Error fetching user"));
        
        const res = await request(app).get("/users/1");
            
        expect(res.status).toBe(500);
        expect(res.body.status).toBe("error");
        expect(res.body.message).toBe("Error fetching user");
    });

    it("should return 404 when user is not found", async () => {
        mockUserService.getUserByIdAsync.mockResolvedValue(null);

        const res = await request(app).get("/users/1");

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toBe("User not found");
    });
    
    it("should update a user on success", async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        mockUserService.updateUserAsync.mockResolvedValue(user);

        const res = await request(app).put("/users/1").send(user);
            
        expect(res.status).toBe(200);
        expect(res.body).toEqual(user);
    });

    it("should return an error message on failure to update user", async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        mockUserService.updateUserAsync.mockRejectedValue(new Error("Error updating user"));

        const res = await request(app).put("/users/1").send(user);
            
        expect(res.status).toBe(500);
        expect(res.body.status).toBe("error");
        expect(res.body.message).toBe("Error updating user");
    });

    it("should return 404 when user is not found for update", async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        mockUserService.updateUserAsync.mockResolvedValue(null);

        const res = await request(app).put("/users/1").send(user);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toBe("User not found");
    });

    it("should delete a user on success", async () => {
        const user = { username: 'User', email: 'Email', password: 'Password' };
        mockUserService.deleteUserAsync.mockResolvedValue(user);

        const res = await request(app).delete("/users/1");
                
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "User deleted successfully" });
    });

    it("should return an error message on failure to delete user", async () => {
        mockUserService.deleteUserAsync.mockRejectedValue(new Error("Error deleting user"));
            
        const res = await request(app).delete("/users/1");

        expect(res.status).toBe(500);
        expect(res.body.message).toBe("Error deleting user");
    });
});