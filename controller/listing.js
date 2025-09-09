import { query } from "express";
import dotenv from 'dotenv';
dotenv.config();
import Listing from "../models/listing.js";
import ExpressError from "../utils/ExpressError.js"//handling error status and error msg
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js'//for geocoding
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


export const index=async(req,res)=>{
    const allListings=await Listing.find({})
    res.render("listings/index",{allListings})
}

export const renderNewForm=async(req,res)=>{
    res.render("listings/new")
}

export const createListing=async(req,res,next)=>{
    let response= await geocodingClient
    .forwardGeocode({
        query:req.body.listing.location,
        limit:1,
    })
    .send();

    // let {title,description,image,price,location,country}=req.body;
    // let listing=req.body.listing;
    // let url=req.file.path;//accesing file name
    // let filename=req.file.filename;
    console.log(req.body.listing);
         const newListing=new Listing(req.body.listing);
         newListing.owner=req.user._id;//adding owner along with new listing
         newListing.image=req.files.map(file=>({
            url:file.path,
            filename:file.filename
        }));//storing it in backend
//         newListing.image = {
//   url: req.file.path,
//   filename: req.file.filename
// };
         newListing.geometry=response.body.features[0].geometry//adding loc to database
         await newListing.save();
         req.flash("success","New Listing Created!");
         res.redirect("/listings");
}

export const showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({//nexting populate in review model and getting author name
        path:"reviews",
        populate:{
            path:"author"
        }
    })
    .populate("owner");
    // console.log(listing.owner.username)
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show",{listing});
}

export const editListing=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    req.flash("success","Listing edited successfully");
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    let existingImage = listing.image.length > 0
        ? listing.image[0].url.replace("/upload", "/upload/h_200,w_250")
        : null;
    res.render("listings/edit.ejs",{listing,existingImage});    
}

export const updateListing=async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data");
    }
    let{id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url=req.file.path;//accesing file name
        let filename=req.file.filename;
        listing.image={url,filename};//storing it in backend
        await listing.save();
    }
    req.flash("success","Listing edited successfully")
    res.redirect(`/listings/${id}`);
}
export const destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully");
    res.redirect("/listings")
}


// GET /listings/search?location=delhi
export const searchListings = async (req, res) => {
    const { location } = req.query;
  
    const listings = await Listing.find({
      location: { $regex: new RegExp(location, "i") }, // case-insensitive search
    });
  
    if (!listings.length) {
      req.flash("error", "No listings found for that location.");
      return res.redirect("/listings");
    }
  
    res.render("listings/index", { allListings: listings });
  };
  

export default { index,renderNewForm,createListing,showListing,editListing,updateListing,destroyListing,searchListings};