const User = require("../models/user.js");

module.exports.signup = async (req,res)=>{
  try{
    let {username,password,email} = req.body;
    const newUser = new User({email,username});
    let regUser = await User.register(newUser,password);
    req.login(regUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","Welcome to Airbnb");
      res.redirect("/listings");
    });
  }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
};

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.userLogin = (req,res)=>{
    req.flash("success","Welcome to Airbnb! You are now logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req,res)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","you are now logged out!");
      res.redirect("/listings");
    });
};