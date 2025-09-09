import User from "../models/user.js";


export const renderSignup=(req,res)=>{
    res.render("../views/users/signup")
}

export const signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registeredUser=await User.register(newUser,password);//passport is hashing the password
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{//its a functionality for automatically login if user is signup 
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Roaderz");
        res.redirect("/listings"); 
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/users/signup");
    }
}

export const renderLogin=(req,res)=>{
    res.render("../views/users/login.ejs")
}

export const login=async(req,res)=>{
    req.flash("success","Welcome back to Roaderz");
    let redirectUrl=res.locals.redirectUrl || "/listings";//user redirect to the page were he wnt to access or default go on listing route
    res.redirect(redirectUrl);
}

export const logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
}

export default {renderSignup,signup,renderLogin,login,logout}