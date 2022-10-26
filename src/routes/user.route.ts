import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRoute = Router();

userRoute.post('/signup', userController.signUp);

userRoute.post('/autenticate', userController.authenticate);

export default userRoute;
