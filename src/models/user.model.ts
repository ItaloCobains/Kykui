import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}
