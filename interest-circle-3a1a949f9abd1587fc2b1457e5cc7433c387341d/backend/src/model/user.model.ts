
import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type : String, required: true, unique: true },
  password: { type : String, required: true },
})

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

export const User = mongoose.model<IUser>('User', UserSchema);