import mongoose from "mongoose";
import { IContact } from "./interface";

const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    message: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export { Contact };
