
import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import dbConnect from "../../../../lib/dbconnect";
import UserModel from "../../../../model/User";
import bcrypt from 'bcryptjs';
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email or username")
                    }
                    if(!user.isVerified){   
                        throw new Error("User is not verified")
                    }
                    const isPasswordCorrext = await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrext){
                        return user
                    }else{
                        throw new Error("User is not verified")  
                    }
                    

                } catch (error) {
                    
                }
              }
        })
    ],
    callbacks:{
       
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username

            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages 
                session.user.username = token.username
            }
            return session
        }
    },
    pages:{
        signIn:"signIn",
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.JWT_SECRET

}