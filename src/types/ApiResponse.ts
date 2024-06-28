import { Message } from "../model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessafes?: boolean;
    messages?:Array<Message>
}
