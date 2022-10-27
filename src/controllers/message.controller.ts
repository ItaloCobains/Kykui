import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user.interface';
import messageModel from '../models/message.model';

/* It creates a new message in the database and returns it to the client */
export class MessageController {
    /**
     * It creates a new message in the database, and returns it to the user
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - the response object
     * @returns The message that was created.
     */
    public async send(req: Request, res: Response): Promise<Response> {
        const message = await messageModel.create({
            text: req.body.text,
            sender: (req.user as UserInterface)._id,
            recipient: (req.userChat as UserInterface)._id
        });

        return res.json(message);
    }
}

export default new MessageController();
