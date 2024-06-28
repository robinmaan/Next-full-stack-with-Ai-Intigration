import dbConnect from "../../../lib/dbconnect";
import UserModel from "../../../model/User";
import bcrypt from 'bcryptjs';

import sendVerificationEmail from './../../../helpers/sendVerificationEmail'

export default async function POST(request:Request){
   await dbConnect();
    try {
        //get data from request
        const {username , email ,password} = await request.json()
        //find if user is is already in the database
        const existingUserVerified = await UserModel.findOne({
            username,
            isVerified:true,
        })
        if(existingUserVerified){
            return Response.json({
                message:"Username is alreadt exist",
                success:false,

            },{status:400})
        }
        //generate a verification code and save it to the database
        const verifyCode  = Math.floor(100000 + Math.random()*900000).toString()
        //check if the user is already in the database by email
        const existingUserByEmail = await UserModel.findOne({email})
        if(existingUserByEmail){
           if(existingUserByEmail.isVerified){
                return  Response.json({
                    message:"Username is already taken",
                    success:false,
                },{status:500})
           } 
        }else{
            //password excyription
            const hashedPassword = await bcrypt.hash(password,10)
            //making a expiry date for verification code
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            //making a new user and save it to the database
            const newUser = new UserModel({
                username,
                email,
                hashedPassword,
                required:true,
                verifyCode,
                isVerified:false,
                ExpiryCode:expiryDate,
                isAcceptingMessage:true,
                message:[]
            })
            await newUser.save()
        }
        //send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                message:"Username is already taken",
                success:false,
            },{status:500})
        }
        return Response.json({
            message:"Please check your email for verification code",
            success:true,
        },{status:200})
        
    } catch (error) {
        console.error("Error registration ",error)
        return Response.json(
            {
                success:false,
                message:"Error registration",
            },
            {
                status:500,
            }
        )
    }
   
}