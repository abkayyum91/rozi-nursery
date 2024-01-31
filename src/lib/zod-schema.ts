import { z } from "zod";

// get-quotation-form schema
export const getQuoteSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name should be at least 2 characters long.")
    .max(50, "Name should not be more than 50 character.")
    .regex(/^[A-Za-z\s]*$/, "Name must be only character."),
  mobileNumber: z
    .string()
    .length(10, "Mobile number must be 10 digit long.")
    .regex(/^[0-9]{10}/, "You must type only number"),
  message: z
    .string()
    .max(800, "Message should not be more than 800 characrter."),
});
export type TGetQuoteSchema = z.infer<typeof getQuoteSchema>;


//user-register-form schema
export const registerUserSchema = z.object({
  name: z
  .string()
  .min(2, "Name should be at least 2 characters long.")
  .max(50, "Name should not be more than 50 character.")
  .regex(/^[A-Za-z\s]*$/, "Name must be only character."),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 character long.")
})
export type TRegisterUserSchema = z.infer<typeof registerUserSchema>

//user-login-form schema
export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 character long."),
})
export type TLoginUserSchema = z.infer<typeof loginUserSchema>


