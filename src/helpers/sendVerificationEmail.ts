import { resend } from "../lib/resend";
import VerificationEmal from "../../email/VerificationEmail"
import { ApiResponse } from "../types/ApiResponse";


export default async function sendVerificationEmail(
   
   email:string,
   username: string,
   verificationCode: string

): Promise<ApiResponse>{

    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'Verifiation code :',
            react: VerificationEmal({username,otp:verificationCode}),
          });
        return{success:true,message:"Successfully send email"}
    } catch (error) {
        console.error("Failed to send verification email:", error)
        return{success:false,message:"Failed to send email"}
    }
};