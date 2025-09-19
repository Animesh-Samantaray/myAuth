import mongoose from 'mongoose';

const connectDb=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Connected successfully');
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/myauth`)
}

export default connectDb;