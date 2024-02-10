import { Types } from "mongoose";

import { EActionTokenType } from "../enums";

export interface ITokenPayload {
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
}

export interface IActionToken extends Document {
  actionToken: string;
  tokenType: EActionTokenType;
  _userId: Types.ObjectId;
}
