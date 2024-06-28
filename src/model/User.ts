import mongoose,{Document,Schema} from "mongoose";

//making user model/ defining the data type of our model
export interface Message extends Document{
    content:string 
    createdAt:Date
}
//Message Schema
const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})


export interface User extends Document{
    username:string
    email:string
    password:string
    required:true
    verifyCode:string
    isVerified:boolean
    ExpiryCode:Date
    isAcceptingMessage:boolean
    message:Message[]
}

const UserSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        unique:true,  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\..+/, 'Please use a valid email address']  
    },
    verifyCode:{
        type:String,
        required:[true,'VerifyCode is required'],
        
    },
    ExpiryCode:{
        type:Date,
        required:[true,'ExpiryCode is required'],
        
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:[true,'Verification is required']
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
        
    },
    message:[MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema)
export default UserModel