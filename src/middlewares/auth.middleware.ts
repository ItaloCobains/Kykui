import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';

class AuthMiddleware {
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
}

export default new AuthMiddleware();
