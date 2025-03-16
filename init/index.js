const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongoUrl = "mongodb://127.0.0.1:27017/airbnb"
async function main(){
    await mongoose.connect(mongoUrl);
}
main().then(()=>{
    console.log("connected to DB");
 })
 
 .catch((err)=>{
     console.log(err);
 });

const initDb = async ()=>{
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj,owner:'67cf0ef2900993e4d24da160',   geometry: { type: 'Point', coordinates: [ 77.2090, 28.6139 ] }}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDb();