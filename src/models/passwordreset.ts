import { Schema, ObjectId, Document, model, Types } from "mongoose";

interface pReset extends Document {
  user: Types.ObjectId;
  expiresIn: Date;
  resetToken: string;
}

const passwordResetSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    resetToken: {
      type: Number,
      required: true,
    },
    expiresIn: {
      type: Date,
      default: new Date(Date.now() + 30 + 60 + 1000),

    },
  },
  { timestamps: true }
);


const passReset = model<pReset>("passReset",passwordResetSchema);

export default passReset;