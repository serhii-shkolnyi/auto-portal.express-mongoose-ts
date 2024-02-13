import { Document, Types } from "mongoose";

export interface IOblast extends Document {
  _id: Types.ObjectId;
  oblast: string;
}
