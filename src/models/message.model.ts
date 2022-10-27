import { model, Schema, Document, Model, DocumentQuery } from 'mongoose';
import { MessageInterface } from '../interfaces/message.interface';

interface MessageModel extends MessageInterface, Document {}

interface MessageStatic extends Model<MessageModel> {
    chatSearch(
        idUserLogged: string,
        idUserChat: string
    ): DocumentQuery<MessageModel[], MessageModel>;
}

/* Creating a new schema for the message model. */
const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

/* A static method that is used to search for messages between two users. */
messageSchema.statics.chatSearch = function (
    idUserLogged: string,
    idUserChat: string
): DocumentQuery<MessageModel[], MessageModel> {
    return this.find({
        $or: [
            {
                $and: [{ sender: idUserLogged }, { recipient: idUserChat }]
            },
            {
                $and: [{ sender: idUserChat }, { recipient: idUserLogged }]
            }
        ]
    });
};

export default model<MessageModel, MessageStatic>('message', messageSchema);
