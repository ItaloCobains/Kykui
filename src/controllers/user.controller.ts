import { Request, Response } from 'express';
import userModel from '../models/user.model';

/* It's a class that has two methods, one for sign up and one for authentication */
class UserController {
    /**
     * It creates a new user in the database and returns a response with the user's id and
     * name
     * @param {Request} req - Request - This is the request object that contains the data
     * sent by the client.
     * @param {Response} res - Response - This is the response object that will be returned
     * to the client.
     * @returns A response object with a message, _id and name.
     */
    public async signUp(req: Request, res: Response): Promise<Response> {
        const user = await userModel.create(req.body);
        const response = {
            message: 'Usuario foi cadastrado',
            _id: user._id,
            name: user.name
        };
        return res.json(response);
    }

    /**
     * It receives the user's email and password, searches for the user in the database,
     * compares the password sent with the password stored in the database, and if everything
     * is correct, it returns the user and the token
     * @param {Request} req - Request - The request object.
     * @param {Response} res - Response - The response object that will be returned to the
     * user.
     * @returns The user and the token
     */
    public async authenticate(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .send({ message: 'Usuario não encontrado', error: true });
        }

        const passwordValid = await user.comparePassword(password);
        if (!passwordValid) {
            return res
                .status(400)
                .send({ message: 'Senha incorreta', error: true });
        }

        return res.json({
            user,
            token: user.genarateToken()
        });
    }
}

export default new UserController();
