import wrapAsync from "../utils/wrapasync.js";//for error handling- showing error page 
import {isOwner, LogedIn,validateListing} from "../middlewares/logedin.js"//middleware for checking user is loged in or not and owner of the user is logged in 
import listingController from "../controller/listing.js"
import multer from "multer";
import {storage} from "../cloudConfig.js"
const upload = multer({ storage })//multer store img into storage named destination

import express from "express";
const router = express.Router();

// Search Route
router.get("/search", wrapAsync(listingController.searchListings));
router.route("/")

.get(wrapAsync(listingController.index))//Index route
.post(
    LogedIn,
    // validateListing,
    // upload.array("listing[image]",5),//saves image in multer
    upload.array("image"),
    wrapAsync(listingController.createListing));//create route

//new route
router.get("/new",LogedIn,listingController.renderNewForm)

router.route("/:id")
.get(wrapAsync(listingController.showListing))//show route
.put(LogedIn,isOwner,
    upload.array('image', 5), // support up to 5 images
    // validateListing,
    wrapAsync(listingController.updateListing))//update route

//edit route
router.get("/:id/edit",LogedIn,isOwner,wrapAsync(listingController.editListing)
);

//delete route
router.delete("/:id/delete",isOwner,wrapAsync(listingController.destroyListing)
);

export default router;