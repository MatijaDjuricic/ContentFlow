import express from 'express';
import { UserController } from '../controllers/UserController';
import { container } from '../container';

const router = express.Router();
const userController = container.get<UserController>(UserController);

router.route('/login')
    .post(userController.loginUser);

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export default router;