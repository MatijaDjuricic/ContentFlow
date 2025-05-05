import express from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { container } from '../container';
import { BlogController } from '../controllers/BlogController';

const router = express.Router();
const blogController = container.get<BlogController>(BlogController);

router.route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.createBlog);

router.route('/:id')
    .get(blogController.getBlogById as RequestHandler)
    .put(blogController.updateBlog as RequestHandler)
    .delete(blogController.deleteBlog as RequestHandler);

export default router;