# Airbnb-Clone
# WanderLust - Airbnb-Inspired Rental Web App

## 🌍 About WanderLust
WanderLust is a dynamic web application inspired by Airbnb, allowing users to list, explore, review, and search rental properties worldwide. This full-stack project implements authentication, cloud storage, interactive maps, and more to provide a seamless rental experience.

## 🚀 Features
- **User Authentication & Authorization** (Passport.js)
- **Session Management** (Express-Session + MongoStore)
- **Cloudinary Image Uploads** for property listings
- **Interactive Map Integration** (Leaflet.js API)
- **Search Functionality** – Find listings by title
- **CRUD Operations** – Users can create, update, and delete listings
- **Reviews & Ratings** – Users can review and rate properties
- **Flash Messages** – Instant user feedback
- **Server-side Validations** (Joi)
- **Responsive UI** – Built with Bootstrap

## ⚙ Tech Stack & Architecture

### **Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose

### **Frontend:**
- EJS (Embedded JavaScript)
- Bootstrap

### **Third-Party Integrations:**
- **Authentication:** Passport.js
- **File Storage:** Cloudinary
- **Map Integration:** Leaflet.js
- **Validations:** Joi
- **Session Storage:** MongoStore

## 🏗 Project Structure (MVC Pattern)
```
WanderLust/
│── models/
│   ├── listing.js
│   ├── review.js
│── routes/
│   ├── listings.js
│   ├── reviews.js
│   ├── users.js
│── controllers/
│   ├── listings.js
│   ├── reviews.js
│   ├── users.js
│── views/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── edit.ejs
│   │   ├── new.ejs
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   ├── reviews/
│   │   ├── new.ejs
│── public/
│   ├── stylesheets/
│   ├── scripts/
│── app.js
│── package.json
│── .env
```

## 🛠 Installation & Setup

### **Prerequisites:**
- Node.js & npm installed
- MongoDB (local or MongoDB Atlas)
- Cloudinary account for image storage
  

## 🌍 Deployment
### **Hosting Services Used:**
- **Render** – Backend deployment
- **MongoDB Atlas** – Cloud database
- **Cloudinary** – Media storage

## 🛡 Security & Best Practices
- **Hashed Passwords** using bcrypt
- **Input Validation** using Joi
- **Session Management** with secure cookies


## 💡 Future Enhancements
- Implement payment processing with Stripe/Razorpay
- Improve search functionality with fuzzy search
- Convert into a Progressive Web App (PWA)
- Add real-time messaging for host-guest interaction

## 🤝 Contributing
Pull requests are welcome! Feel free to open an issue for any bug reports or feature requests.

## 📜 License
This project is licensed under the MIT License.

## 🔗 Live Demo
https://wanderlust-ciyy.onrender.com/listings

## ✨ Acknowledgments
Special thanks to Open Source contributors and online resources that made this project possible! 🚀

