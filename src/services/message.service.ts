import { MessageInterface } from '../interfaces/message.interface';
import { MessageUser, UserInterface } from '../interfaces/user.interface';

class MessageService {
    public getResultMessageUser(
        u: UserInterface,
        m: MessageInterface
    ): MessageUser {
        return {
            _id: u._id,
            name: u.name,
            avatar: u.avatar,
            lastMessage: m?.text || null,
            dateLastMessage: m?.createdAt || null
        };
    }

    public returnMessageOrden(usersMessage: MessageUser[]): MessageUser[] {
        return usersMessage.sort((a, b) => {
            return (
                (a.dateLastMessage ? 0 : 1) - (b.dateLastMessage ? 0 : 1) ||
                -((a.dateLastMessage as Date) > (b.dateLastMessage as Date)) ||
                +((a.dateLastMessage as Date) < (b.dateLastMessage as Date))
            );
        });
    }
}

export default new MessageService();
