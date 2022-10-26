import { Request, Response } from 'express';
import userModel from '../models/user.model';

class UserController {
    public async signUp(req: Request, res: Response): Promise<Response> {
        const user = await userModel.create(req.body);
        const response = {
            message: 'Usuario foi cadastrado',
            _id: user._id,
            name: user.name
        };
        return res.json(response);
    }

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
