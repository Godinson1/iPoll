import mongoose from "mongoose";

export interface IPoll extends mongoose.Document {
  pollID: mongoose.Types.ObjectId;
  creator: string;
  title: string;
  endDate: string;
  category: string;
  options: Array<IPollOptions>;
  coverPhoto: string;
  status: string;
  total_votes: number;
}

interface IPollOptions {
  id: string;
  content: string;
  count: number;
}

export interface IContact extends mongoose.Document {
  contactId: mongoose.Types.ObjectId;
  name: string;
  message: string;
  email: string;
}
