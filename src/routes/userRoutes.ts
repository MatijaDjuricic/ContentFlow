import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { UserController } from '../controllers/UserController';
import { container } from '../container';

const router = express.Router();
const userController = container.get<UserController>(UserController);

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUserById as RequestHandler)
    .put(userController.updateUser as RequestHandler)
    .delete(userController.deleteUser as RequestHandler);

export default router;