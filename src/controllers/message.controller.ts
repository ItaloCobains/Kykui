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

    /**
     * It returns a list of messages from the chat between the logged user and the user who
     * is being chatted with
     * @param {Request} req - Request - This is the request object that contains the data
     * sent by the client.
     * @param {Response} res - Response - The response object that will be returned to the
     * user.
     * @returns An array of objects with the following structure:
     */
    public async list(req: Request, res: Response): Promise<Response> {
        const idUserLogged = (req.user as UserInterface)._id;
        const idUserChat = (req.userChat as UserInterface)._id;

        const messages = await messageModel
            .chatSearch(idUserLogged, idUserChat)
            .sort('createdAt');

        const messageChat = messages.map((message) => {
            return {
                text: message.text,
                createdAt: message.createdAt,
                isSender: message.sender == String(idUserLogged)
            };
        });

        return res.json(messageChat);
    }
}

export default new MessageController();
