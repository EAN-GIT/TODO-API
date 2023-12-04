import { Schema, model, Document } from "mongoose";
// import { required } from "nodemon/lib/config";

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: "user" | "admin";
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default: "user"
  }
});


const User = model<IUser>("User",userSchema)

export default User

