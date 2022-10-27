import { model, Schema } from 'mongoose';

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

export default model('message', messageSchema);
