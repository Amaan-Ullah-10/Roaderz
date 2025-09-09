import mongoose from "mongoose";
import initData from "./data.js"
import Listing from "../models/listing.js";

let mongoURL='mongodb://127.0.0.1:27017/roader';
main()
.then((res)=>{
    console.log("connection succesful")
})
.catch((err) =>{
    console.log(err);
});

async function main() {
  await mongoose.connect(mongoURL);
}

const initDB=async()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({ ...obj,owner:"672d01d4c794c730d6057226"}))//associating owner with all listings
    await Listing.insertMany(initData.data);
    console.log("data has been initialize successfully");
}

initDB()