const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilitis/wrapAsync");
const {isLoggedIn,isOwner,validateListings} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const listingController = require("../controllers/listings.js");

//search
router.route("/search")
 .get(wrapAsync(listingController.searchListing));


//index route - all listings
//create route
router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(isLoggedIn,upload.single('listing[image]',validateListings),wrapAsync(listingController.createListing));

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route (read) 
//update route
//authorization
//delete route
router
 .route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListings,wrapAsync(listingController.updateListing))
 .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;