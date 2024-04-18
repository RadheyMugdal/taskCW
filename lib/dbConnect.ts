import mongoose from "mongoose";
type ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}
export async function connectDB () : Promise<void> {
    if(connection.isConnected===1){
       console.log("Already connected")
       return;
    }
    try {
        const db=await mongoose.connect(process.env.MONGO_URI!)
        connection.isConnected=db.connections[0].readyState
        console.log("connected to db");
        
    } catch (err) {
        console.log("Error connecting to db",err)
        process.exit(1)
    }
}   