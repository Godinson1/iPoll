import mongoose from "mongoose";
import { IPoll } from "./interface";

const Schema = mongoose.Schema;

const PollSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    status: {
      type: String,
    },
    total_votes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model<IPoll>("Poll", PollSchema);

export { Poll };
