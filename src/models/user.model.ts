import { model, Schema, Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface UserModel extends UserInterface, Document {
    comparePassword(password: string): Promise<boolean>;
    genarateToken(): string;
}

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

userSchema.methods.comparePassword = function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, (this as any).password);
};

userSchema.methods.genarateToken = function (): string {
    const decodedToken = {
        _id: String(this._id),
        name: (this as any).name,
        avatar: (this as any).avatar
    };

    return jwt.sign(decodedToken, process.env.SECRET_KEY as string, {
        expiresIn: '1d'
    });
};

export default model<UserModel>('users', userSchema);
