import mongoose from "mongoose";

const URI = process.env.URL
  ? process.env.URL
  : "mongodb://localhost/db";
//console.log(URI);

async function dbconet(){
  const mongoosedb = await mongoose.connect(URI);
  console.log('db connectada en', mongoosedb.connection.db.databaseName)
}

dbconet()
//key : iAsmRUJKR0TBA0lf
// mongodb+srv://moises:iAsmRUJKR0TBA0lf@cluster0.fbcub16.mongodb.net/?retryWrites=true&w=majority