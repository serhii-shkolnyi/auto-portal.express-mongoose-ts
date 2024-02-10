import { Document, Types } from "mongoose";

export interface IShowroom extends Document {
  _id: Types.ObjectId;
  showroom: string;
}
