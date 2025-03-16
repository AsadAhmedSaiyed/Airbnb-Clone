const Listing = require("../models/listing.js");
const fetch = require('node-fetch');
const getListingCoordinates = require("../utilitis/geocode.js");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find();
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res,next)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{path:"author"}
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing Does Not Exist!");
        res.redirect("/listings");
    }else{
        res.render("listings/show.ejs",{listing});
    }
};

module.exports.createListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    const coords = await getListingCoordinates(req.body.listing.location);
    console.log(coords);
    if (!coords) {
        req.flash("error", "Invalid address. Please enter a valid location.");
        return res.redirect("/listings/new");
    }

    // Store coordinates in GeoJSON format
    newListing.geometry = {
        type: "Point",
        coordinates: [coords.longitude, coords.latitude] // Note: [longitude, latitude]
    };

    let saved = await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does Not Exist!");
        res.redirect("/listings");
    }else{
        let orgImgUrl = listing.image.url;
        orgImgUrl = orgImgUrl.replace("upload","/upload/w_250");
        res.render("listings/edit.ejs",{listing,orgImgUrl});
    }
};

module.exports.updateListing = async (req,res)=>{
   let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !== "undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image = {url,filename};
     await listing.save();
   }
   req.flash("success","Listing Updated!");
   res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res)=>{
   let {id} = req.params;
   let listing = await Listing.findByIdAndDelete(id);
   req.flash("success","New Listing Deleted!");
   res.redirect(`/listings`);
};

module.exports.searchListing = async(req,res)=>{
     const {title} = req.query;
     const listing = await Listing.findOne({title:title});
     const id = listing._id;
     res.redirect(`/listings/${id}`);
};