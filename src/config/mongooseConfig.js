import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// const url = process.env.DB_URL;
// console.log("URL: ", url);

export const connectToDB = async()=>{
	try{
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
      		useUnifiedTopology: true
		});
		console.log("Mongodb connected using mongoose successfully!")
	}
	catch(err){
		console.log("Error while connecting to db");
		console.log(err);
	}
}
