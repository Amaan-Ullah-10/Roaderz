import Listing from "../models/listing.js";
import {listingSchema} from "../schema.js"//server side validation from joi
import ExpressError from "../utils/ExpressError.js"//handling error status and error msg
import {reviewSchema} from "../schema.js"//server side validation from joi
import Review from "../models/review.js";


export const LogedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;//extracting the original path where user want to go 
        req.flash("error","you must logged in")
        return res.redirect("/users/login");
    }
    next();
}

export const savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;//storing in locals so that it could be use anywhere
    }
    next();
}

export const isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

export const validateListing=(req,res,next)=>{//error handling through  back-end for listing
    let {error}=listingSchema.validate(req.body);//validating the listing schema
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

export const validateReview=(req,res,next)=>{//error handling through  back-end for review
    let {error}=reviewSchema.validate(req.body);//validating the listing schema
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


export const isReviewOwner=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}