import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user.interface';
import messageModel from '../models/message.model';

export class MessageController {
    public async send(req: Request, res: Response): Promise<Response> {
        const message = await messageModel.create({
            text: req.body.text,
            sender: req.user?._id,
            recipient: req.params.id
        });

        return res.json(message);
    }
}

export default new MessageController();
