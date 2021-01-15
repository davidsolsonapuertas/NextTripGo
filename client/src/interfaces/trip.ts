import { Document, Types } from 'mongoose';

import { User } from './User';

export interface Trip extends Document {
  id: string;
  destination: Destination;
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

export interface Destination {
  formattedAddress: string;
  latitude: number;
  longitude: number;
}
