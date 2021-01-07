import { Document, Types } from 'mongoose';

import { User } from './user';

export interface Trip extends Document {
  destination: string;
  picture: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  userid: User;
  expenses: string;
  toDo: string;
  friends: Types.ObjectId[];
}
