import mongoose from "mongoose";

type  ConnectionObject = {
    isConnected?:number
}

const connection:ConnectionObject = {}

//check if the databse is already connected or not 
//Basically database is running continuesly but in next js it is not connected permanently 
//when the user send request it send request to the data base (it works on edge cases ) 

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }
    //if the data base is not connected then connect it
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL||"")

        connection.isConnected = db.connections[0].readyState
        
        console.log("db connected succesfully")
    } catch (error) {
        console.log("db connection failed",error)
        process.exit(1)
    }

}
export default dbConnect;