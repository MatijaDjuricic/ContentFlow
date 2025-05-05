import { Container } from "inversify";
import { UserController } from "./controllers/UserController";
import { BlogController } from "./controllers/BlogController";
import { UserService } from "./services/userService";
import { BlogService } from "./services/blogService";
import { IBlogService } from "./interfaces/IBlogService";
import { IUserService } from "./interfaces/IUserService";
import { TYPES } from "./types/types";
import "reflect-metadata";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
container.bind<UserController>(UserController).toSelf();

container.bind<IBlogService>(TYPES.IBlogService).to(BlogService).inSingletonScope();
container.bind<BlogController>(BlogController).toSelf();

export { container };