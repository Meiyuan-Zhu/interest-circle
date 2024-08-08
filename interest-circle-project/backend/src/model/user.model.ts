
import * as mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  postId: {type: mongoose.Schema .Types.ObjectId, ref: 'Post'},
  message: { type: String, required: true },
  read: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
})

const UserSchema = new mongoose.Schema({
  username: { type : String, required: true, unique: true },
  password: { type : String, required: true },
  notifications: [NotificationSchema]
})

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  notifications: {
    postId: mongoose.Types.ObjectId,
    message: string,
    read: boolean,
    createdAt: Date,
  }[];
}

export const User = mongoose.model<IUser>('User', UserSchema);