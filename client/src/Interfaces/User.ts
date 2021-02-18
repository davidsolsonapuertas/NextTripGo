import { Document, Types } from 'mongoose';

import { Trip } from './Trip';

export interface User extends Document {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  currentCity: Destination;
  profilePic: string;
  friends: Types.ObjectId[];
  sentFriendRequests: string[];
  receivedFriendRequests: string[];
  trips: Trip[];
  email: string;
  password: string;
  createdAt: string;
}

export interface Destination {
  formattedAddress: string;
  latitude: number;
  longitude: number;
}
