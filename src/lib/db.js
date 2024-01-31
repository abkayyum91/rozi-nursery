import mongoose from "mongoose";



const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI){
    throw new error("Please define the MONGODB_URI environment variable inside .env")
}

let cachedConnection = null;

async function connectDB(){
    if(cachedConnection) return cachedConnection;

    try {
        const connectionInstance = await mongoose.connect(MONGODB_URI)
        cachedConnection = connectionInstance;    
        console.log("\n MongoDB connected successfully!!")        
        // console.log("\n Database connection host: ", connectionInstance.connection.host)      
    } catch (error) {
        console.log("Error connecting to database: ", error)
        process.exit(1);
    }
}


export default connectDB;