import mongoose, { SchemaType } from "mongoose";
import { Schema } from "mongoose";
import Review from "./review.js";

const bikingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:[ {
        url:String,
        filename:String
    }],
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: false,
    },
    renting_price: {
        type: Number,
        required: true,
    },
    mileage: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Automatically stores the current date when data is inserted
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        set:(v)=>
            v===""
          ?"india"
          :v,//it is used for default image
    },
    geometry: {//geoJson format
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    category: {
        type: String,
        enum: ["Car", "Bus", "Truck", "Van", "Bike"], // Only allows these values
        required: true
    },
    reviews:[//building one to many relationship
        {
            type:Schema.Types.ObjectId,//storing id of review in listing schema
            ref:"Review",//reference taken from Review model
        }
    ],
    owner://building one to many relationship
        {
            type:Schema.Types.ObjectId,//storing id of review in listing schema
            ref:"User",//reference taken from user model
        }
});

//deleting the all reviews related to one Listing model(mongoose middleware)
bikingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})


// Custom validation to ensure at least one of price or renting_price is provided
bikingSchema.path("price").validate(function (value) {
    // `this` refers to the current document being validated
    return this.price != null || this.renting_price != null;
  }, "You must provide either a price or a renting_price.");

  
const Listing = mongoose.model("Listing", bikingSchema);
export default Listing