import { model, Schema, Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

interface UserModel extends UserInterface, Document {}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});

userSchema.pre<UserModel>('save', async function encryptPassword() {
    this.password = await bcrypt.hash(this.password, 8);
});

userSchema.pre<UserModel>('save', async function generateAvatar() {
    const rndInt = Math.floor(Math.random() * 50) + 1;
    this.avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${rndInt}.jpg`;
});

export default model<UserModel>('users', userSchema);
