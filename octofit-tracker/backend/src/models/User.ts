import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  profileImage: string;
  favoriteActivity: string;
  joinedAt: Date;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    profileImage: { type: String, required: true },
    favoriteActivity: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', userSchema);