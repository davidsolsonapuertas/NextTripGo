import { Document, Types } from 'mongoose';

import { Trip } from './trip';

export interface User extends Document {
  firstname: string;
  lastname: string;
  username: string;
  currentCity: string;
  profilePic: string;
  friends: Types.ObjectId[];
  trips: Trip[];
  email: string;
  password: string;
  createdAt: string;
}
