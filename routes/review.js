import wrapAsync from "../utils/wrapasync.js";//for error handling- showing error page 
import { isReviewOwner, LogedIn,validateReview } from "../middlewares/logedin.js";
import reviewController from "../controller/review.js"

import express from "express";
const router = express.Router({mergeParams:true});//merge params is said to be true bcz we are sending params from parent route to child route


//post route
router.post("/",LogedIn,validateReview,wrapAsync(reviewController.postReview)
)
//delete review route
router.delete("/:reviewId",LogedIn,isReviewOwner,wrapAsync(reviewController.destroyReview)
)
export default router;