import { Types } from "mongoose";

export interface IModel extends Document {
  _id: Types.ObjectId;
  model: string;
  _brandId: Types.ObjectId;
}
