
//it will not upload .env file when we deploy our proj
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");


const dbUrl = process.env.ATLASDB_URL

const path = require("path");
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const methodOverride =require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);
const ExpressError = require("./utilitis/ExpressError");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const useRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


async function main(){
    await mongoose.connect(dbUrl);
}

main().then(()=>{
   console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

app.listen(8080,()=>{
  console.log("Server is started");
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24 * 3600
});

store.on("error",()=>{
    console.log("Error in Mongo Session Store",err);
});

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60* 60 * 1000,
        maxAge: 7 * 24 * 60* 60 * 1000,
        httpOnly:true
    }
};

// app.get("/",(req,res)=>{
//     res.send("Hi");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demo",async (req,res)=>{
//     let fake = new User({
//         email:"student@gmail.com",
//         username:"student"
//     });
//     let newUser = await User.register(fake,"helloworld");
//     res.send(newUser);
// });

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",useRouter);

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description: "By the beach",
//         price:12000,
//         location:"Calangute,Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successful");
// });




//standard response if req doesn't matches with all above routes
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

//error handler
 app.use((err,req,res,next)=>{
    let {statusCode = 500,message = "Error"} = err;
    if (!err.statusCode) {
        if (err.name === "ValidationError") {
            err.statusCode = 400; //  Bad Request for validation errors
        } else {
            err.statusCode = 500; //  Internal Server Error for others
        }
    }

       res.status(statusCode).render("error.ejs", { err });
    // res.status(statusCode).send(message);
 });

