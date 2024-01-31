"use server";
import { removeOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import {
  TLoginUserSchema,
  TRegisterUserSchema,
  loginUserSchema,
  registerUserSchema,
} from "@/lib/zod-schema";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

 
// 👤 user-registration 👤
export const registerUser = async (data: TRegisterUserSchema) => {
  const valid = registerUserSchema.safeParse(data);
  if (!valid.success) return {success: false, message: "Please fill correct detail." };
  await connectDB();
  const { name, email, password } = valid.data;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return {success: false, message: "Email is registerd already!" };
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return { success: true, message: "User created successfully!" };
  } catch (error) {
    console.log("Error in user registration: ", error);
  }
};

// getting user-roles
export const getUserRole= async(data: TLoginUserSchema)=>{
  const valid = loginUserSchema.safeParse(data);
  if (!valid.success) return {success: false, message: "Please fill correct detail." };
  await connectDB();

  const { email, password } = valid.data;

  try {
    const user = await User.findOne({email});
    if (!user) return {success: false, message: "User does not exist!"};

    const matched = bcrypt.compareSync(password, user.password);
    if(!matched) return {success: false, message: "Something went wrong!"};

    return user.role;

  } catch (error) {
    console.log("Error in getUserRole action: ", error)
  }
}

// remove-image-from-cloudinary
export const removeImageAction = async (public_id: string)=>{
  try {
    const res = await removeOnCloudinary(public_id);
    if(!res) return {success: false, message: "Got error while removing image!"}
    return {success: true, message: "image removed!"}
  } catch (error) {
    console.log("Error in server action while removing image from cloudinary: ", error);
  }
}

