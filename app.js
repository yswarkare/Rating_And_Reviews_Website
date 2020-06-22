const express = require("express");
const mongoose = require("mongoose");
const { mongoURI } = require("./Config/config")
const cors = require("cors");
const { success, error } = require("consola");
const passport = require("passport");
const { strategy } = require("./middlewares/passport");
const path = require("path");


const app = express()

app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static("ratings-and-reviews/build"));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "ratings-and-reviews", "build", "index.html"));
    })
}


app.use(cors());
app.use(passport.initialize());

passport.use(
    strategy
);

const uri = mongoURI;

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>success({message: `MongoDB Database Connection Established Successfully with database \n${uri}`, badge: true}))
.catch((err)=>error({message: `MongoDB Database Connection Failed \n${err}`, badge: true}));

// Routers

// Admins Router

const adminsRouter = require("./Routes/adminsRoutes");

app.use("/api/admins", adminsRouter);

// Users Router

const usersRouter = require("./Routes/usersRoutes");

app.use("/api/users", usersRouter);

// Categories Router

const categoriesRouter = require("./Routes/categoriesRoutes");

app.use("/api/categories", categoriesRouter);

// SubCategories Router

const subCategoriesRouter = require("./Routes/subCategoriesRoutes");

app.use("/api/sub-categories", subCategoriesRouter);

// SubSubCategories Router

const subSubCategoriesRouter = require("./Routes/subSubCategoriesRoutes");

app.use("/api/sub-sub-categories", subSubCategoriesRouter);

// Products Router

const productsRouter = require("./Routes/productsRoutes");

app.use("/api/products", productsRouter);

// Reviews Router

const ratingsRouter = require("./Routes/ratingsRoutes");

app.use("/api/ratings", ratingsRouter);

// Reviews Router

const reviewsRouter = require("./Routes/reviewsRoutes");

app.use("/api/reviews", reviewsRouter);


module.exports = app;