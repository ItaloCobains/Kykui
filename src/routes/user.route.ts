import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const userRoute = Router();
/* Creating a route for the user to sign up and authenticate. */

userRoute.post('/signup', userController.signUp);

userRoute.post('/autenticate', userController.authenticate);

userRoute.get(
    '/:id',
    authMiddleware.authorizeUserByParams,
    authMiddleware.authorizeUserByToken,
    userController.getById
);

userRoute.get('/', authMiddleware.authorizeUserByToken, userController.list);

export default userRoute;
