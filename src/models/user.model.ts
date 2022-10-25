import { model, Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  age: number;
  // token?: string;
}

const UserSchema = new Schema({
  name: {
    type: String,
    unique: false
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  age: {
    type: Number
  },
  token: {
    type: String,
    unique: true
  }
});

const UserModel = model<IUser>('Users', UserSchema);

export { UserModel, IUser };
