import mongoose, { Schema, ObjectId, Document, model, Types } from "mongoose";

interface pReset extends Document {
  user: mongoose.Types.ObjectId;
  expiresIn: Date;
  resetToken: string;
}

const passwordResetSchema = new Schema<pReset>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    resetToken: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Date,
      default:  new Date(Date.now() + 60 * 60 * 1000),

    },
  },
  { timestamps: true }
);


const passReset = model<pReset>("passReset",passwordResetSchema);

export default passReset;