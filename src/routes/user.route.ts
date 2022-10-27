import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRoute = Router();
/* Creating a route for the user to sign up and authenticate. */

userRoute.post('/signup', userController.signUp);

userRoute.post('/autenticate', userController.authenticate);

export default userRoute;
