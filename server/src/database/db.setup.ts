import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/HEXCODE_DB").then(() => {
    console.log("📢 HEXCODE : MongoDB is connected!");
}).catch((e) => {
    console.log(e);
    console.log("📢 HEXCODE : MongoDB is not connected!");
});

export default mongoose;