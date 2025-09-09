import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override"
import ejsMate from "ejs-mate"
import ExpressError from "./utils/ExpressError.js"//handling error status and error msg
import listingsRouter from "./routes/dynamic.js";//child route for listings
import reviewsRouter from "./routes/review.js";//child route for review
import session, { Cookie } from "express-session";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user.js";
import usersRouter from "./routes/user.js";//child route for users
import staticRoutes from "./routes/static.js";//static routes like home/about-us



const app= express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));//this used for using ejs files

app.use(express.urlencoded({extended:true}));//used for extracting stuff from url
app.use(methodOverride("_method"));//using npm method override for using put request 
app.engine("ejs",ejsMate)//for using same layout for all pages one time only
app.use(express.static(path.join(__dirname,"/public")))

//creating sessions
const sessionOptions={
    secret:"mysupersecretcode", // Secret key to sign the session ID cookie
    resave: false,// Don't save the session back to the store if it wasn't modified
    saveUninitialized: true, // Save new sessions even if they haven't been modified
    cookie: {
        expires:Date.now()+7*24*60*60*1000,//7 days expiry(counted in milisec)
        maxAge:7*24*60*60*1000,
        httpOnly:true//prevent cross scripting attack
    }
}
app.use(session(sessionOptions));
app.use(flash());//always used before the routes 

//passport always used after the session middleware
app.use(passport.initialize());//initializing passport
app.use(passport.session());//its used for storing knowing same user is entering in different tabs so he/she doesnt hve to enter password again
passport.use(new LocalStrategy(User.authenticate()))//automatically authenticating user password
passport.serializeUser(User.serializeUser())//storing all the user related info in db
passport.deserializeUser(User.deserializeUser())//dlting all the user related info from db


app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser=req.user;
    next();
})

//connecting to db
let mongoURL='mongodb://127.0.0.1:27017/roader';
main()
.then((res)=>{
    console.log("connection succesful")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoURL);
}
//parent route
app.use("/", staticRoutes);
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/users",usersRouter);



//error handling for going to invalid route(custom desiging error)   {this error part always in the last}
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"))
})
//error handling
app.use((err, req, res, next) => {
    // console.error("Error message:", err.message);
    // console.error("Error stack:", err.stack);
    req.flash("error", err.message || "Something went wrong");
    res.redirect("/listings");
})
  

app.get("/",(req,res)=>{
    res.send("this is the root")
});

app.listen(8000,()=>{
    console.log("server is listening to port 8000")
})

