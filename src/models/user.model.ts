import mongoose, { Document, Schema } from "mongoose";

// enum for user role
enum userRole {
  User = "user",
  Admin = "admin",
}

// interface for user document
interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: userRole;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Name is required!"],
      lowercase: true,
    },
    email: {
      type: Schema.Types.String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: Schema.Types.String,
    },
    role: {
      type: Schema.Types.String,
      enum: Object.values(userRole),
      default: userRole.User,
    },
    avatar:{
      type: Schema.Types.String,
    }
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
