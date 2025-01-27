import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);  // Exit process with failure
  }
};

export default connectDB;


// import mongoose from "mongoose"
// import dotenv from 'dotenv'
// dotenv.config()
// mongoose.connect(process.env.DATABASE)
//   .then(()=>{
//     console.log("Database connected successfully.")
//   })
//   .catch(error=>{
//     console.log(error);
    
//   })

// export default mongoose;