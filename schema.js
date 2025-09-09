import Joi from "joi"

const listingSchema=Joi.object({
    listing: Joi.object({
        name:Joi.string().required(),
        image:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(10000),
        renting_price:Joi.number().required().min(20),
        mileage:Joi.number().required().min(0),
        location:Joi.string().required(),
        country: Joi.string().allow("", null) // Set default value to "India" if empty or null
}).required()
});

// export default listingSchema;

const reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})
export  {listingSchema,reviewSchema};