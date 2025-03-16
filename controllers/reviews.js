const Reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");


module.exports.createReview = async (req,res)=>{
    console.log("Incoming Review Data:", req.body);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review);
    newReview.author = req.user._id 
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
   let {id,reviewId} = req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});//it removes that reviews whose id matches 
   await Reviews.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted!");
   res.redirect(`/listings/${id}`);
};