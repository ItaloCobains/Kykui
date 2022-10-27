import { Router } from 'express';
import messageController from '../controllers/message.controller';
import authMiddleware from '../middlewares/auth.middleware';

const messageRoute = Router();

/* A route that is used to send a message to a user. */
messageRoute.post(
    '/:id',
    authMiddleware.authorizeUserByParams,
    authMiddleware.authorizeUserByToken,
    messageController.send
);

export default messageRoute;
