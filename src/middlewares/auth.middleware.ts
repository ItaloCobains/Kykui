import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';

/* It's a class that has two methods, one to validate the token and the other to validate the
user by the id */
class AuthMiddleware {
    /**
     * It checks if the user has a valid token, if so, it sets the user in the request object
     * and calls the next function
     * @param {Request} req - Request - The request object.
     * @param {Response} res - Response - This is the response object that will be sent back
     * to the client.
     * @param {NextFunction} next - NextFunction - This is a function that will be called
     * when the middleware is done.
     * @returns The user object
     */
    public async authorizeUserByToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        const token = req.query.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(401).send({ message: 'Acesso Restrito' });
        }

        try {
            const userToken = jwt.verify(
                token as string,
                process.env.SECRET_KEY as string
            ) as UserInterface;

            const user = await userModel.findById(userToken._id);

            if (!user) {
                return res.status(400).send({ message: 'User não existe.' });
            }

            req.user = user;

            return next();
        } catch (err) {
            return res.status(401).send({ message: 'Token invalido.' });
        }
    }

    /**
     * It receives a request, a response and a next function as parameters, and then it tries
     * to find a user by the id passed in the request parameters. If it finds the user, it
     * assigns it to the request object and calls the next function. If it doesn't find the
     * user, it returns a response with a 400 status code and a message. If it catches an
     * error, it returns a response with a 401 status code and a message
     * @param {Request} req - Request - The request object.
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction: This is a function that will be called when
     * the middleware is done.
     * @returns The user is being returned.
     */
    public async authorizeUserByParams(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const user = await userModel.findById(req.params.id);

            if (!user) {
                return res.status(400).send({ message: 'User não existe.' });
            }

            req.userChat = user;

            return next();
        } catch (err) {
            return res.status(401).send({ message: 'Usuario invalido.' });
        }
    }
}

export default new AuthMiddleware();
