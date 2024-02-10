import { Document, Types } from "mongoose";

export interface IRole extends Document {
  _id: Types.ObjectId;
  role: string;
  _showroomId: Types.ObjectId;
}
