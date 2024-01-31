import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import connectDB from "./db"
import { User as UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials.password) return null;
        const {email, password} = credentials;

        try {
          await connectDB();

          const user = await UserModel.findOne({email});
          if (!user) return null;

          const matched = bcrypt.compareSync(password, user.password);
          if(!matched) return null;

          return user;          
        } catch (error) {
          console.log("Error in nextAuth authorization: ", error)
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user}){
      if(user) token.role = user.role;
      return token
    },
    async session({ session, token }) {
      if(session?.user) session.user.role = token.role;
      return session
    },
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin-login"
  }
}