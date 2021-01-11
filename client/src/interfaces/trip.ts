import { Document, Types } from 'mongoose';

import { User } from './user';

export interface Trip extends Document {
  destination: string;
  picture: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  userid: User;
  expenses: [Expense];
  toDo: string;
  friends: Types.ObjectId[];
}

export interface Expense {
  type: string;
  amount: number;
  currency: string;
}
