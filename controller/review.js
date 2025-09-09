import Listing from "../models/listing.js";
import Review from "../models/review.js";

export const postReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);///extracting id from the url
    let newReview=new Review(req.body.review);//extracting review from front end
    newReview.author=req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);//inside listing schema there is a review array inside that we are pushing new review
    await newReview.save();
    await listing.save();
    req.flash("success","New review added successfully");
    res.redirect(`/listings/${listing._id}`);
}
export const destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})//pull is used for plucking out the reviews in Listing model with the help of reviewsId
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`)
}

export default {postReview,destroyReview}