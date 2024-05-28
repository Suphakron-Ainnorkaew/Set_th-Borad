const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connect data complete: ${connect.connection.host}`);
    }catch(error){
        console.log(err);
    }
}
module.exports = connectDB;