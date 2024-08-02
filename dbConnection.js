import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected succesfully 😂🫲");
    } catch (error) {
        console.log("Error connecting to database: ", error);
        process.exit(1)
        
    }
};


export default connectDB;